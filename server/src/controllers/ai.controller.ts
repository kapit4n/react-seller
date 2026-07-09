import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {post, requestBody, Response, RestBindings} from '@loopback/rest';
import {ProductRepository} from '../repositories/product.repository';
import {OrderDetailRepository} from '../repositories/order-detail.repository';
import {OrderRepository} from '../repositories/order.repository';
import {CustomerRepository} from '../repositories/customer.repository';
import {AIService} from '../ai/service';
import type {ChatRequest, ExecuteRequest, ExecuteResponse} from '../ai/types';

export class AIController {
  private aiService: AIService;

  constructor(
    @repository(ProductRepository) productRepo: ProductRepository,
    @repository(OrderDetailRepository) orderDetailRepo: OrderDetailRepository,
    @repository(OrderRepository) orderRepo: OrderRepository,
    @repository(CustomerRepository) customerRepo: CustomerRepository,
  ) {
    this.aiService = new AIService(
      productRepo,
      orderDetailRepo,
      orderRepo,
      customerRepo,
    );
  }

  @post('/api/ai/chat', {
    responses: {
      200: {description: 'SSE stream of AI chat response'},
    },
  })
  async chat(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {type: 'string'},
              history: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    role: {type: 'string'},
                    content: {type: 'string'},
                  },
                },
              },
            },
            required: ['message'],
          },
        },
      },
    })
    body: ChatRequest,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    try {
      for await (const chunk of this.aiService.chat(
        body.message,
        body.history || [],
      )) {
        if (chunk.type === 'text') {
          response.write(
            `data: ${JSON.stringify({type: 'text', content: chunk.content})}\n\n`,
          );
        } else if (chunk.type === 'proposal') {
          response.write(
            `data: ${JSON.stringify({type: 'proposal', proposal: chunk.proposal})}\n\n`,
          );
        } else if (chunk.type === 'error') {
          response.write(
            `data: ${JSON.stringify({type: 'error', error: chunk.error})}\n\n`,
          );
        }
      }
      response.write(`data: ${JSON.stringify({type: 'done'})}\n\n`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Internal server error';
      response.write(
        `data: ${JSON.stringify({type: 'error', error: message})}\n\n`,
      );
    } finally {
      response.end();
    }
  }

  @post('/api/ai/execute', {
    responses: {
      200: {description: 'Execution result'},
    },
  })
  async execute(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              actions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['add', 'remove', 'update', 'clear', 'submit'],
                    },
                    productId: {type: 'number'},
                    productName: {type: 'string'},
                    quantity: {type: 'number'},
                    customerId: {type: 'number'},
                  },
                  required: ['type'],
                },
              },
            },
            required: ['actions'],
          },
        },
      },
    })
    body: ExecuteRequest,
  ): Promise<ExecuteResponse> {
    return this.aiService.executeActions(body.actions);
  }
}
