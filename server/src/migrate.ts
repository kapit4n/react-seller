import {juggler} from '@loopback/repository';

const products = [
  // Beverages
  {name: 'Coca-Cola 600ml', code: 'BEV-CC600', price: 6.00, description: 'Refresco Coca-Cola original 600ml.', stock: 100, img: '/images/BEV-CC600.png'},
  {name: 'Coca-Cola 2L', code: 'BEV-CC2L', price: 12.00, description: 'Coca-Cola familiar 2 litros.', stock: 60, img: '/images/BEV-CC2L.png'},
  {name: 'Coca-Cola Zero 600ml', code: 'BEV-CCZ600', price: 6.00, description: 'Coca-Cola sin azúcar 600ml.', stock: 80, img: '/images/BEV-CCZ600.png'},
  {name: 'Pepsi 500ml', code: 'BEV-PEP500', price: 5.50, description: 'Pepsi cola 500ml.', stock: 90, img: '/images/BEV-PEP500.png'},
  {name: 'Pepsi 2L', code: 'BEV-PEP2L', price: 11.00, description: 'Pepsi familiar 2 litros.', stock: 55, img: '/images/BEV-PEP2L.png'},
  {name: 'Agua Vital 600ml', code: 'BEV-AGT600', price: 3.50, description: 'Agua purificada Vital 600ml.', stock: 120, img: '/images/BEV-AGT600.png'},
  {name: 'Agua Vital 2L', code: 'BEV-AGT2L', price: 6.50, description: 'Agua purificada Vital 2 litros.', stock: 70, img: '/images/BEV-AGT2L.png'},
  {name: 'Sprite 600ml', code: 'BEV-SPR600', price: 6.00, description: 'Sprite lima-limón 600ml.', stock: 75, img: '/images/BEV-SPR600.png'},
  {name: 'Fanta Naranja 600ml', code: 'BEV-FAN600', price: 6.00, description: 'Fanta naranja 600ml.', stock: 65, img: '/images/BEV-FAN600.png'},
  {name: 'Jugo Del Valle Durazno 1L', code: 'BEV-DVD1L', price: 8.00, description: 'Jugo Del Valle sabor durazno 1 litro.', stock: 40, img: '/images/BEV-DVD1L.png'},

  // Snacks
  {name: 'Lays Clásicas 50g', code: 'SNK-LYS50', price: 4.00, description: 'Papas fritas Lays clásicas 50g.', stock: 150, img: '/images/SNK-LYS50.png'},
  {name: 'Lays Clásicas 150g', code: 'SNK-LYS150', price: 8.00, description: 'Papas fritas Lays clásicas 150g.', stock: 80, img: '/images/SNK-LYS150.png'},
  {name: 'Doritos Nacho 60g', code: 'SNK-DRT60', price: 5.00, description: 'Doritos sabor nacho 60g.', stock: 100, img: '/images/SNK-DRT60.png'},
  {name: 'Doritos Nacho 160g', code: 'SNK-DRT160', price: 9.00, description: 'Doritos sabor nacho 160g.', stock: 60, img: '/images/SNK-DRT160.png'},
  {name: 'Cheetos Torciditos 50g', code: 'SNK-CHT50', price: 4.50, description: 'Cheetos Torciditos 50g.', stock: 110, img: '/images/SNK-CHT50.png'},
  {name: 'Ruffles Queso 55g', code: 'SNK-RFL55', price: 4.50, description: 'Ruffles sabor queso 55g.', stock: 90, img: '/images/SNK-RFL55.png'},
  {name: 'Chocolate Snickers 52g', code: 'SNK-SNK52', price: 7.00, description: 'Barra de chocolate Snickers 52g.', stock: 70, img: '/images/SNK-SNK52.png'},
  {name: 'Galletas Oreo 90g', code: 'SNK-ORO90', price: 6.00, description: 'Galletas Oreo original 90g.', stock: 85, img: '/images/SNK-ORO90.png'},
  {name: 'Chicles Trident Menta', code: 'SNK-TRM', price: 2.00, description: 'Chicles Trident sabor menta 12 unidades.', stock: 200, img: '/images/SNK-TRM.png'},
  {name: 'Maní Salado 100g', code: 'SNK-MAN100', price: 5.00, description: 'Maní salado 100g.', stock: 95, img: '/images/SNK-MAN100.png'},

  // Tech (existing)
  {name: 'Logitech G502 X Plus', code: 'MOU-G502X', price: 159.99, description: 'Wireless gaming mouse with LIGHTFORCE hybrid switches and 25K DPI HERO sensor.', stock: 25, img: '/images/MOU-G502X.png'},
  {name: 'Razer DeathAdder V3 Pro', code: 'MOU-DAV3', price: 149.99, description: 'Ultra-lightweight ergonomic esports gaming mouse with Focus Pro 30K optical sensor.', stock: 18, img: '/images/MOU-DAV3.jpg'},
  {name: 'Keychron Q1 Pro', code: 'KEY-Q1P', price: 199.00, description: 'QMK/VIA wireless mechanical keyboard with CNC aluminum body and hot-swappable switches.', stock: 12, img: '/images/KEY-Q1P.jpg'},
  {name: 'Logitech MX Master 3S', code: 'MOU-MXM3', price: 99.99, description: 'Productivity mouse with 8K DPI, quiet clicks and multi-device flow.', stock: 30, img: '/images/MOU-MXM3.png'},
  {name: 'Corsair K70 RGB Pro', code: 'KEY-K70R', price: 179.99, description: 'Mechanical gaming keyboard with Cherry MX Red switches, PBT caps and per-key RGB.', stock: 20, img: '/images/KEY-K70R.jpg'},
];

const customers = [
  {name: 'Juan Pérez', address: 'Av. Ballivián 123, Edif. Torres, Of. 4B', budget: 500},
  {name: 'María García', address: 'Calle Potosí 456, Zona Central', budget: 300},
  {name: 'Carlos López', address: 'Av. San Martín 789, Sopocachi', budget: 750},
  {name: 'Ana Rodríguez', address: 'Calle Linares 234, Zona Sur', budget: 200},
  {name: 'Pedro Martínez', address: 'Av. 6 de Agosto 567, Miraflores', budget: 1000},
  {name: 'Laura Fernández', address: 'Calle Colombia 890, San Pedro', budget: 350},
  {name: 'Diego Morales', address: 'Av. Arce 123, Calacoto', budget: 600},
  {name: 'Sofía Vargas', address: 'Calle Ecuador 456, Villa Fátima', budget: 150},
];

const vendors = [
  {name: 'Embol S.A.', address: 'Av. Blanco Galindo Km 8', img: '/images/embol.png'},
  {name: 'PepsiCo Bolivia', address: 'Zona Industrial Santa Cruz', img: '/images/pepsico.png'},
  {name: 'Nestlé Bolivia', address: 'Av. Montenegro 1234', img: '/images/nestle.png'},
  {name: 'Mondelez Bolivia', address: 'Zona Franca El Alto', img: '/images/mondelez.png'},
  {name: 'Ingenious SRL', address: 'Av. 16 de Julio 456', img: '/images/ingenious.png'},
];

async function migrate(): Promise<void> {
  console.log('Running migration...');

  const ds = new juggler.DataSource({
    name: 'db',
    connector: 'memory',
    file: 'react-seller-data.json',
  }) as any;

  const Product = ds.define('Product', {
    name: {type: String, required: true},
    code: {type: String},
    price: {type: Number, required: true, default: 0},
    description: {type: String},
    stock: {type: Number, required: true, default: 0},
    img: {type: String, required: true},
  });

  const Customer = ds.define('Customer', {
    name: {type: String, required: true},
    address: {type: String, required: true, default: 'None'},
    budget: {type: Number, required: true, default: 0},
  });

  const Vendor = ds.define('Vendor', {
    name: {type: String, required: true},
    address: {type: String, required: true, default: 'None'},
    img: {type: String},
  });

  const Order = ds.define('Order', {
    customerId: {type: Number},
    createdDate: {type: Date},
    total: {type: Number},
    description: {type: String},
    paid: {type: Boolean, required: true, default: false},
    delivered: {type: Boolean, required: true, default: false},
    deliveryDate: {type: Date},
  });

  const OrderDetail = ds.define('OrderDetail', {
    quantity: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    totalPrice: {type: Number, required: true, default: 0},
    discount: {type: Number, default: 0},
    orderId: {type: Number},
    productId: {type: Number},
  });

  const PurchaseOrder = ds.define('PurchaseOrder', {
    vendorId: {type: Number},
    createdDate: {type: Date},
    total: {type: Number},
  });

  const PurchaseItem = ds.define('PurchaseItem', {
    quantity: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    purchaseOrderId: {type: Number},
    productId: {type: Number},
  });

  const pc = await Product.count();
  if (pc > 0) {
    console.log(`Found ${pc} existing products, skipping.`);
  } else {
    for (const p of products) {
      await Product.create(p);
    }
    console.log(`Seeded ${products.length} products.`);
  }

  const cc = await Customer.count();
  if (cc > 0) {
    console.log(`Found ${cc} existing customers, skipping.`);
  } else {
    for (const c of customers) {
      await Customer.create(c);
    }
    console.log(`Seeded ${customers.length} customers.`);
  }

  const vc = await Vendor.count();
  if (vc > 0) {
    console.log(`Found ${vc} existing vendors, skipping.`);
  } else {
    for (const v of vendors) {
      await Vendor.create(v);
    }
    console.log(`Seeded ${vendors.length} vendors.`);
  }

  const oc = await Order.count();
  if (oc > 0) {
    console.log(`Found ${oc} existing orders, skipping.`);
  } else {
    const order = await Order.create({
      customerId: 1,
      createdDate: new Date(),
      total: 45.00,
      paid: true,
      delivered: true,
      deliveryDate: new Date(),
    });
    await OrderDetail.create({orderId: order.id, productId: 1, quantity: 3, price: 6.00, totalPrice: 18.00});
    await OrderDetail.create({orderId: order.id, productId: 4, quantity: 2, price: 5.50, totalPrice: 11.00});
    await OrderDetail.create({orderId: order.id, productId: 12, quantity: 4, price: 4.00, totalPrice: 16.00});
    console.log('Seeded 1 order with 3 items.');
  }

  console.log('Migration complete.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
