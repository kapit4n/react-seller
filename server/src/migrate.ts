import {juggler} from '@loopback/repository';

const products = [
  {name: 'Logitech G502 X Plus', code: 'MOU-G502X', price: 159.99, description: 'Wireless gaming mouse with LIGHTFORCE hybrid switches and 25K DPI HERO sensor.', stock: 25, img: '/images/MOU-G502X.png'},
  {name: 'Razer DeathAdder V3 Pro', code: 'MOU-DAV3', price: 149.99, description: 'Ultra-lightweight ergonomic esports gaming mouse with Focus Pro 30K optical sensor.', stock: 18, img: '/images/MOU-DAV3.jpg'},
  {name: 'Keychron Q1 Pro', code: 'KEY-Q1P', price: 199.00, description: 'QMK/VIA wireless mechanical keyboard with CNC aluminum body and hot-swappable switches.', stock: 12, img: '/images/KEY-Q1P.jpg'},
  {name: 'Corsair K70 RGB Pro', code: 'KEY-K70R', price: 179.99, description: 'Mechanical gaming keyboard with Cherry MX Red switches, PBT caps and per-key RGB.', stock: 20, img: '/images/KEY-K70R.jpg'},
  {name: 'SteelSeries Apex Pro', code: 'KEY-APEX', price: 189.99, description: 'Adjustable mechanical keyboard with OmniPoint 2.0 switches and an OLED smart display.', stock: 15, img: '/images/KEY-APEX.jpg'},
  {name: 'Glorious Model O', code: 'MOU-MODELO', price: 49.99, description: 'Superlight honeycomb gaming mouse with PIXART 3360 sensor and flexible cable.', stock: 40, img: '/images/MOU-MODELO.jpg'},
  {name: 'Logitech MX Master 3S', code: 'MOU-MXM3', price: 99.99, description: 'Productivity mouse for developers with 8K DPI, quiet clicks and multi-device flow.', stock: 30, img: '/images/MOU-MXM3.png'},
  {name: 'HyperX Alloy Origins 65', code: 'KEY-HYX65', price: 89.99, description: 'Compact 65% mechanical keyboard with HyperX Red switches and aircraft-grade aluminum.', stock: 22, img: '/images/KEY-HYX65.png'},
  {name: 'Razer BlackWidow V4', code: 'KEY-BWV4', price: 169.99, description: 'Full-size mechanical keyboard with green tactile switches and a magnetic wrist rest.', stock: 14, img: '/images/KEY-BWV4.jpg'},
  {name: 'Razer Viper V2 Pro', code: 'MOU-VIPV2', price: 149.99, description: 'Featherlight 58g wireless esports mouse with Focus Pro 30K sensor and zero mouse drift.', stock: 17, img: '/images/MOU-VIPV2.png'},
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

  const count = await Product.count();
  if (count > 0) {
    console.log(`Found ${count} existing products, skipping seed.`);
  } else {
    for (const p of products) {
      await Product.create(p);
    }
    console.log(`Seeded ${products.length} products.`);
  }

  console.log('Migration complete.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
