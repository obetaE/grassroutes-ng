import { useEffect, useMemo, useState } from 'react';
import StorePages from './store-pages.jsx';

const products = [
  {
    id: 1,
    name: 'Sweet red peppers',
    category: 'Vegetables',
    farm: 'Green Valley Farm',
    price: 850,
    originalPrice: 1050,
    unit: 'basket',
    stock: 30,
    description: 'Sweet, crisp peppers grown with care and picked at their best. A lovely, colourful addition to everyday meals.',
    unitOptions: [
      { label: 'Counter', price: 850 },
      { label: '1kg', price: 1250 },
      { label: '3kg', price: 3450 },
      { label: '5kg', price: 5500 },
      { label: '10kg', price: 10200 },
    ],
    badge: 'Just picked',
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Sun-ripened tomatoes',
    category: 'Vegetables',
    farm: 'Ifeoma’s Garden',
    price: 1200,
    unit: 'crate',
    stock: 42,
    description: 'A proper kitchen staple: juicy, sun-ripened tomatoes picked by our growers and packed with flavour.',
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Farm fresh eggs',
    category: 'Dairy & eggs',
    farm: 'Morning Dew Farm',
    price: 2400,
    unit: 'tray of 15',
    stock: 18,
    description: 'Fresh free-range eggs from happy hens at Morning Dew Farm. Gathered by hand and carefully packed.',
    badge: 'Free range',
    image:
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Golden sweet corn',
    category: 'Grains',
    farm: 'Green Valley Farm',
    price: 650,
    unit: 'bundle',
    stock: 25,
    description: 'Golden sweet corn, grown in season and harvested at just the right time.',
    badge: 'In season',
    image:
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Garden carrots',
    category: 'Vegetables',
    farm: 'Little Acre Co-op',
    price: 700,
    unit: 'bunch',
    stock: 35,
    description: 'Crunchy garden carrots, freshly lifted from the soil and ready for your kitchen.',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Creamy ripe avocados',
    category: 'Fruits',
    farm: 'Ifeoma’s Garden',
    price: 500,
    unit: 'each',
    stock: 50,
    description: 'Creamy, ripe-and-ready avocados grown in good soil and picked with care.',
    badge: 'Ripe & ready',
    image:
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    name: 'Baby spinach',
    category: 'Vegetables',
    farm: 'Little Acre Co-op',
    price: 900,
    unit: 'bag',
    stock: 20,
    description: 'Tender baby spinach, freshly picked and full of the good stuff.',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8,
    name: 'Sweet, juicy oranges',
    category: 'Fruits',
    farm: 'Sunrise Orchard',
    price: 1500,
    unit: 'dozen',
    stock: 16,
    description: 'Sweet, juicy oranges from Sunrise Orchard. Picked when they are full of sunshine.',
    badge: 'Seasonal',
    image:
      'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 9,
    name: 'Fresh beef steaks',
    category: 'Meat & fish',
    farm: 'Okocha Family Farm',
    price: 12440,
    originalPrice: 15440,
    unit: 'kg',
    stock: 50,
    description: 'Beautifully cut, locally sourced beef. Raised with care and prepared fresh for your table.',
    unitOptions: [
      { label: 'Counter', price: 12440 },
      { label: '15kg', price: 178000 },
      { label: '25kg', price: 290000 },
      { label: '35kg', price: 399000 },
      { label: '45kg', price: 511000 },
    ],
    badge: '20% off',
    image:
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 10,
    name: 'Fresh Atlantic salmon',
    category: 'Meat & fish',
    farm: 'The Coastal Catch',
    price: 6800,
    unit: 'portion',
    stock: 14,
    description: 'Fresh, carefully handled salmon from our trusted coastal fishers.',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 11,
    name: 'Farm-raised whole chicken',
    category: 'Meat & fish',
    farm: 'Morning Dew Farm',
    price: 7200,
    unit: 'each',
    stock: 12,
    description: 'Wholesome, farm-raised chicken prepared fresh and ready for a family meal.',
    badge: 'Farm favourite',
    image:
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 12,
    name: 'Stone-ground brown rice',
    category: 'Grains',
    farm: 'Green Valley Farm',
    price: 3200,
    unit: '2kg bag',
    stock: 28,
    description: 'Nutty, locally grown brown rice carefully milled in small batches.',
    badge: 'Pantry staple',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 13,
    name: 'Sweet pineapple',
    category: 'Fruits',
    farm: 'Sunrise Orchard',
    price: 1700,
    unit: 'each',
    stock: 20,
    description: 'Sun-ripened pineapple, grown to be sweet and shared fresh.',
    badge: 'In season',
    image:
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=85',
  },
];

const categories = [
  {
    name: 'Vegetables',
    detail: 'Picked fresh, every morning',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85',
    tint: 'sage',
  },
  {
    name: 'Fruits',
    detail: 'Sweetness straight from the orchard',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=85',
    tint: 'peach',
  },
  {
    name: 'Grains',
    detail: 'Goodness grown close to home',
    image:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85',
    tint: 'butter',
  },
  {
    name: 'Dairy & eggs',
    detail: 'Simple, honest farm staples',
    image:
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=85',
    tint: 'lavender',
  },
];

const money = (amount) => `₦${amount.toLocaleString('en-NG')}`;

function Icon({ name, size = 20, className = '' }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    heart: <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />,
    leaf: (
      <>
        <path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z" />
        <path d="M4 21c2-5 6-8 12-11" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14m-7-7h14" />,
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    star: <path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 3Z" />,
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="19" r="2" />
        <circle cx="17.5" cy="19" r="2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18m-14 5h4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="/" aria-label="Grassroutes home">
      <span className="brand-mark">
        <Icon name="leaf" size={24} />
      </span>
      <span>grassroutes</span>
    </a>
  );
}

function Header({ cartCount, onOpenCart, onOpenAccount, searchTerm, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(() => `${window.location.pathname}${window.location.hash}`);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateLocation = () => setCurrentLocation(`${window.location.pathname}${window.location.hash}`);
    window.addEventListener('hashchange', updateLocation);
    window.addEventListener('popstate', updateLocation);
    return () => {
      window.removeEventListener('hashchange', updateLocation);
      window.removeEventListener('popstate', updateLocation);
    };
  }, []);

  const currentPath = currentLocation.split('#')[0].replace(/\/+$/, '') || '/';
  const currentHash = currentLocation.split('#')[1] || '';
  const activeNav = currentPath === '/'
    ? 'home'
    : currentPath === '/about' && currentHash === 'our-values'
      ? 'why'
      : currentPath === '/about'
        ? 'story'
        : currentPath === '/shop'
          || currentPath.startsWith('/product/')
          || ['/cart', '/delivery', '/checkout', '/order-status'].includes(currentPath)
          ? 'shop'
          : '';
  const navLinkClass = (page) => `nav-link${activeNav === page ? ' nav-current' : ''}`;

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" />
        Fresh from the farm, delivered to your door
        <a href="/shop">Shop the harvest <Icon name="arrow" size={14} /></a>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={`main-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
            <a className={navLinkClass('home')} aria-current={activeNav === 'home' ? 'page' : undefined} href="/" onClick={closeMenu}>Home</a>
            <a className={navLinkClass('shop')} aria-current={activeNav === 'shop' ? 'page' : undefined} href="/shop" onClick={closeMenu}>Shop</a>
            <a className={navLinkClass('story')} aria-current={activeNav === 'story' ? 'page' : undefined} href="/about" onClick={closeMenu}>Our story</a>
            <a className={navLinkClass('why')} aria-current={activeNav === 'why' ? 'location' : undefined} href="/about#our-values" onClick={closeMenu}>Why Grassroutes</a>
            <div className="mobile-nav-actions">
              <a className="nav-link mobile-account" href="/login" onClick={closeMenu}>
                <Icon name="user" size={18} /> My account
              </a>
              <button className="button button-primary mobile-shop" onClick={() => { onOpenCart(); closeMenu(); }}>
                Your basket <span>{cartCount}</span>
              </button>
            </div>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button search-button"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Icon name={searchOpen ? 'close' : 'search'} size={21} />
            </button>
            <button className="account-button" onClick={onOpenAccount}>
              <Icon name="user" size={19} />
              <span>Sign in</span>
            </button>
            <button className="button button-primary cart-button" onClick={onOpenCart}>
              <Icon name="bag" size={18} />
              <span>Basket</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
          <button
            className="icon-button menu-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
          </button>
        </div>
        {searchOpen && (
          <form className="search-bar" onSubmit={(event) => {
            event.preventDefault();
            window.location.href = `/shop?q=${encodeURIComponent(searchTerm.trim())}`;
          }}>
            <Icon name="search" size={19} />
            <input
              aria-label="Search produce"
              placeholder="Search fresh produce..."
              autoFocus
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            {searchTerm && (
              <button type="button" className="search-submit" onClick={() => onSearchChange('')}>
                Clear
              </button>
            )}
          </form>
        )}
      </header>
    </>
  );
}

function ProductCard({ product, onAdd, onShow }) {
  return (
    <article className="product-card">
      <a className="product-image-wrap" href={`/product/${product.id}`} onClick={(event) => {
        event.preventDefault();
        onShow(product);
      }} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-quick-view">View details <Icon name="arrow" size={15} /></span>
        <span className="product-farm"><Icon name="leaf" size={14} /> {product.farm}</span>
      </a>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
        <div className="product-buy-row">
          <div>
            <span className="product-price">{money(product.price)}</span>
            <span className="product-unit"> / {product.unit}</span>
          </div>
          <button className="add-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to basket`}>
            <Icon name="plus" size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ cart, onClose, onQuantity, onRemove, onOrder }) {
  const [delivery, setDelivery] = useState('Pickup');
  const items = Object.values(cart);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = delivery === 'Home delivery' && items.length > 0 ? 1000 : 0;

  return (
    <div className="overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="drawer" aria-labelledby="cart-title" role="dialog" aria-modal="true">
        <div className="drawer-heading">
          <div>
            <span className="eyebrow">YOUR HARVEST</span>
            <h2 id="cart-title">Your basket <span className="drawer-count">({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          </div>
          <button className="icon-button close-button" aria-label="Close basket" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon"><Icon name="bag" size={32} /></div>
            <h3>Your basket is taking a breather</h3>
            <p>Good things grow with a little time. Add some fresh picks to get started.</p>
            <button className="button button-dark" onClick={onClose}>Explore the harvest <Icon name="arrow" size={16} /></button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-copy">
                    <span className="product-category">{item.category}</span>
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">{money(item.price)} / {item.unit}</span>
                    <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                      <button aria-label="Decrease quantity" onClick={() => onQuantity(item.id, -1)}><Icon name="minus" size={15} /></button>
                      <span>{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => onQuantity(item.id, 1)}><Icon name="plus" size={15} /></button>
                    </div>
                  </div>
                  <button className="remove-item" onClick={() => onRemove(item.id)}>Remove</button>
                </article>
              ))}
            </div>
            <fieldset className="delivery-choice">
              <legend>How would you like your order?</legend>
              {['Pickup', 'Home delivery'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`delivery-option${delivery === option ? ' selected' : ''}`}
                  aria-pressed={delivery === option}
                  onClick={() => setDelivery(option)}
                >
                  <span className="radio-indicator">{delivery === option && <span />}</span>
                  <span>{option}</span>
                  <small>{option === 'Pickup' ? 'Free · Choose a collection point' : '₦1,000 · To your doorstep'}</small>
                </button>
              ))}
            </fieldset>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div><span>{delivery === 'Home delivery' ? 'Delivery' : 'Pickup'}</span><strong>{shipping ? money(shipping) : 'Free'}</strong></div>
              <div className="cart-total"><span>Estimated total</span><strong>{money(subtotal + shipping)}</strong></div>
              <button className="button button-primary checkout-button" onClick={() => onOrder({ total: subtotal + shipping, delivery, count: items.length })}>
                Continue to checkout <Icon name="arrow" size={17} />
              </button>
              <p>Checkout is a frontend demo. No payment details are collected.</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function AccountDialog({ onClose }) {
  const [mode, setMode] = useState('signin');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="overlay account-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
        <button className="icon-button close-button account-close" aria-label="Close account dialog" onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="account-decoration"><Icon name="leaf" size={30} /></div>
        {submitted ? (
          <div className="account-success">
            <span className="success-icon"><Icon name="check" size={22} /></span>
            <h2 id="account-title">You’re on your way.</h2>
            <p>This is a frontend preview. Account creation and sign-in aren’t connected yet.</p>
            <button className="button button-dark" onClick={onClose}>Back to shopping</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">GOOD TO HAVE YOU HERE</span>
            <h2 id="account-title">{mode === 'signin' ? 'Welcome back' : 'Join the good food club'}</h2>
            <p className="account-intro">{mode === 'signin' ? 'Sign in to pick up where you left off.' : 'A little closer to the farms and food you love.'}</p>
            <form className="account-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              {mode === 'register' && <label>Full name<input autoComplete="name" required placeholder="Your name" /></label>}
              <label>Email address<input autoComplete="email" type="email" required placeholder="you@example.com" /></label>
              <label>Password<input autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} type="password" required minLength="6" placeholder="At least 6 characters" /></label>
              <button className="button button-primary account-submit" type="submit">{mode === 'signin' ? 'Sign in' : 'Create account'} <Icon name="arrow" size={17} /></button>
            </form>
            <p className="account-switch">
              {mode === 'signin' ? 'New to Grassroutes?' : 'Already have an account?'}
              <button onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}>
                {mode === 'signin' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
            <p className="demo-note">Frontend preview only — your details won’t be sent anywhere.</p>
          </>
        )}
      </section>
    </div>
  );
}

function ProductDialog({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <div className="overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title">
        <button className="icon-button close-button product-close" aria-label="Close product details" onClick={onClose}>
          <Icon name="close" />
        </button>
        <img src={product.image} alt={product.name} />
        <div className="product-dialog-copy">
          <span className="eyebrow">{product.category.toUpperCase()} · {product.farm.toUpperCase()}</span>
          <h2 id="product-dialog-title">{product.name}</h2>
          <p>Grown with care and picked at its best. Fresh from {product.farm}, ready to make something delicious.</p>
          <div className="product-dialog-price">{money(product.price)} <span>/ {product.unit}</span></div>
          <button className="button button-primary" onClick={() => { onAdd(product); onClose(); }}>
            Add to basket <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}

function OrderDialog({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="order-dialog" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="icon-button close-button order-close" aria-label="Close order summary" onClick={onClose}>
          <Icon name="close" />
        </button>
        <span className="success-icon"><Icon name="check" size={22} /></span>
        <span className="eyebrow">A LITTLE MORE GOODNESS, COMING UP</span>
        <h2 id="order-title">Your harvest is reserved.</h2>
        <p>This is a frontend-only preview—no order or payment has been sent.</p>
        <div className="order-receipt">
          <span>{order.count} {order.count === 1 ? 'item' : 'items'} · {order.delivery}</span>
          <strong>{money(order.total)}</strong>
        </div>
        <div className="order-timeline">
          <div className="timeline-step complete"><span><Icon name="check" size={14} /></span><div><strong>Basket ready</strong><small>Your fresh picks are gathered</small></div></div>
          <div className="timeline-step"><span>2</span><div><strong>Farm-fresh packing</strong><small>Carefully prepared for you</small></div></div>
          <div className="timeline-step"><span>3</span><div><strong>On its way</strong><small>Delivered or ready for pickup</small></div></div>
        </div>
        <button className="button button-primary order-done" onClick={onClose}>Back to Grassroutes <Icon name="arrow" size={17} /></button>
      </section>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('grassroutes-cart') || '{}');
    } catch (error) {
      console.error('Could not read the saved Grassroutes basket.', error);
      return {};
    }
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    window.localStorage.setItem('grassroutes-cart', JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => {
    const matchingCategory = activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    const matching = normalizedSearch
      ? matchingCategory.filter((product) =>
        `${product.name} ${product.category} ${product.farm}`.toLocaleLowerCase().includes(normalizedSearch))
      : matchingCategory;
    return showAll ? matching : matching.slice(0, 4);
  }, [activeCategory, searchTerm, showAll]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const isDialogOpen = cartOpen || accountOpen || Boolean(selectedProduct) || Boolean(order);
    document.body.classList.toggle('has-overlay', isDialogOpen);
    return () => document.body.classList.remove('has-overlay');
  }, [cartOpen, accountOpen, selectedProduct, order]);

  const addToCart = (product, unitOption, quantity = 1) => {
    const selectedUnit = unitOption?.label || product.unit;
    const cartKey = `${product.id}-${selectedUnit}`;
    setCart((current) => ({
      ...current,
      [cartKey]: {
        ...product,
        id: product.id,
        productId: product.id,
        cartKey,
        selectedUnit,
        unit: selectedUnit,
        price: unitOption?.price ?? product.price,
        quantity: (current[cartKey]?.quantity ?? 0) + quantity,
      },
    }));
    setToast(`${product.name} added to your basket`);
  };

  const updateQuantity = (id, change) => {
    setCart((current) => {
      const item = current[id];
      if (!item) return current;
      const quantity = item.quantity + change;
      if (quantity < 1) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: { ...item, quantity } };
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const completeOrder = (summary) => {
    window.sessionStorage.setItem('grassroutes-order', JSON.stringify(summary));
    setCart({});
    window.sessionStorage.removeItem('grassroutes-location');
    window.location.href = '/order-status';
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onOpenCart={() => { window.location.href = '/cart'; }}
        onOpenAccount={() => { window.location.href = '/login'; }}
        searchTerm={searchTerm}
        onSearchChange={(value) => { setSearchTerm(value); setShowAll(Boolean(value.trim())); }}
      />
      <main>
        {pathname === '/' ? <>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <span className="hero-kicker"><span /> GOOD FOOD STARTS CLOSE TO HOME</span>
              <h1>From our roots<br />to your <em>table.</em></h1>
              <p>Meet the growers behind your groceries. Shop produce picked with care, delivered with purpose.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="/shop">Shop the harvest <Icon name="arrow" size={18} /></a>
                <a className="hero-story-link" href="/about">Get to know us <span>↓</span></a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span>F</span><span>I</span><span>M</span><span>+</span>
                </div>
                <p><strong>Grown by people who care.</strong><br /><span>Local farmers. Honest food.</span></p>
              </div>
            </div>
            <div className="hero-note">
              <span className="hero-note-icon"><Icon name="leaf" size={19} /></span>
              <span><strong>Picked just right.</strong><br />On your doorstep, soon.</span>
              <Icon name="arrow" size={17} />
            </div>
          </div>
          <div className="hero-caption"><span>06° 27′ 11.4″N</span><span>Grown with care in Nigeria</span></div>
        </section>

        <section className="promise-strip">
          <div><Icon name="leaf" size={21} /><span>Picked fresh, never rushed</span></div>
          <span className="promise-separator" />
          <div><Icon name="truck" size={21} /><span>From local farms to your door</span></div>
          <span className="promise-separator" />
          <div><Icon name="heart" size={21} /><span>Good for you, good for growers</span></div>
        </section>

        <section className="categories-section section-pad">
          <div className="section-heading">
            <div><span className="eyebrow">A GOOD PLACE TO START</span><h2>Find your fresh.</h2></div>
            <a className="text-link" href="/shop">Explore all produce <Icon name="arrow" size={17} /></a>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className={`category-card category-${category.tint}`}
                key={category.name}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
              >
                <span className="category-number">0{index + 1}</span>
                <img src={category.image} alt="" loading="lazy" />
                <span className="category-card-copy">
                  <strong>{category.name}</strong>
                  <small>{category.detail}</small>
                  <span className="category-arrow"><Icon name="arrow" size={17} /></span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading shop-heading">
            <div><span className="eyebrow">GOOD THINGS, GROWN NEARBY</span><h2>Today’s good picks.</h2></div>
            <p>A little bit of fresh can change everything.</p>
          </div>
          <div className="category-filter" role="group" aria-label="Filter by category">
            {['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy & eggs', 'Meat & fish'].map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'filter-active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => { setActiveCategory(category); setShowAll(false); setSearchTerm(''); }}
              >
                {category}
                {category === 'All' && <span>{products.length}</span>}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} onShow={(item) => { window.location.href = `/product/${item.id}`; }} />
            ))}
          </div>
          {visibleProducts.length === 0 ? (
            <div className="shop-empty">
              <Icon name="search" size={22} />
              <p>No fresh picks match “{searchTerm.trim()}”.</p>
              <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Browse all produce</button>
            </div>
          ) : activeCategory === 'All' && !searchTerm.trim() ? (
            <button className="button button-outline view-all-button" onClick={() => setShowAll((current) => !current)}>
              {showAll ? 'Show fewer picks' : 'View all good picks'} <Icon name="arrow" size={17} />
            </button>
          ) : null}
        </section>

        <section className="harvest-banner" id="our-story">
          <div className="harvest-banner-image" />
          <div className="harvest-banner-content page-width">
            <div className="harvest-copy">
              <span className="eyebrow eyebrow-light">A BETTER KIND OF GROCERY RUN</span>
              <h2>Know your farmer.<br /><em>Love what’s on your plate.</em></h2>
              <p>We make it easier to shop well and know exactly where your food comes from — with the people who grow it never far from the story.</p>
              <a className="button button-light" href="/about">Get to know Grassroutes <Icon name="arrow" size={17} /></a>
            </div>
            <div className="harvest-card">
              <span className="harvest-card-mark"><Icon name="leaf" size={21} /></span>
              <span className="eyebrow">THE GRASSROUTES PROMISE</span>
              <strong>Good food has<br />good roots.</strong>
              <span className="harvest-card-line" />
              <span>Grown here. Shared with care.</span>
            </div>
          </div>
          <span className="harvest-caption">A LITTLE CLOSER TO THE SOURCE</span>
        </section>

        <section className="why-section section-pad" id="why-grassroutes">
          <div className="why-intro">
            <span className="eyebrow">NOT JUST ANOTHER GROCERY RUN</span>
            <h2>Closer to your food.<br /><em>Closer to what matters.</em></h2>
            <p>Good food should feel good all the way back to where it began. That’s why the people and care behind every harvest matter to us.</p>
            <a className="text-link" href="/about">A little more about us <Icon name="arrow" size={17} /></a>
          </div>
          <div className="why-list">
            <article className="why-card">
              <span className="why-icon"><Icon name="leaf" size={23} /></span>
              <div><h3>Know what you’re eating.</h3><p>Thoughtfully grown produce, with its journey from farm to table right there in the open.</p></div>
              <span className="why-index">01</span>
            </article>
            <article className="why-card">
              <span className="why-icon"><Icon name="heart" size={23} /></span>
              <div><h3>Know who you’re supporting.</h3><p>Your shop supports independent farmers and the communities growing around them.</p></div>
              <span className="why-index">02</span>
            </article>
            <article className="why-card">
              <span className="why-icon"><Icon name="truck" size={23} /></span>
              <div><h3>Get the good stuff, simply.</h3><p>From the day’s harvest to your home, without making a whole thing out of it.</p></div>
              <span className="why-index">03</span>
            </article>
          </div>
        </section>

        <section className="farmer-note">
          <div className="farmer-photo">
            <img
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=85"
              alt="A farmer tending rows of fresh crops"
              loading="lazy"
            />
            <span className="photo-caption">IN GOOD COMPANY, GROWING TOGETHER</span>
          </div>
          <div className="farmer-quote">
            <Icon name="leaf" size={30} />
            <span className="eyebrow">GOOD GROWS HERE</span>
            <blockquote>“The best thing about a good harvest? Knowing exactly who grew it.”</blockquote>
            <p>People first. Produce second to none.</p>
            <a className="text-link" href="/shop">Meet the harvest <Icon name="arrow" size={17} /></a>
          </div>
        </section>

        <section className="newsletter section-pad" id="newsletter">
          <div className="newsletter-copy">
            <span className="eyebrow eyebrow-light">A LITTLE FRESHNESS IN YOUR INBOX</span>
            <h2>Good things grow<br />when we share.</h2>
            <p>Get the seasonal scoop, meet the farmers, and find a little inspiration for your next meal.</p>
          </div>
          <form className="newsletter-form" onSubmit={(event) => {
            event.preventDefault();
            setToast('Thanks for joining our newsletter list!');
            event.currentTarget.reset();
          }}>
            <label htmlFor="newsletter-email">Your email address</label>
            <div className="newsletter-input-row">
              <input id="newsletter-email" type="email" autoComplete="email" required placeholder="you@example.com" />
              <button className="button button-primary" type="submit">Count me in <Icon name="arrow" size={17} /></button>
            </div>
            <small>Just the good stuff. Unsubscribe whenever.</small>
          </form>
          <span className="newsletter-leaf newsletter-leaf-one"><Icon name="leaf" size={88} /></span>
          <span className="newsletter-leaf newsletter-leaf-two"><Icon name="leaf" size={66} /></span>
        </section>
        </> : <StorePages
          pathname={pathname}
          products={products}
          Icon={Icon}
          money={money}
          ProductCard={ProductCard}
          cart={cart}
          onAdd={addToCart}
          onQuantity={updateQuantity}
          onRemove={removeFromCart}
          onComplete={completeOrder}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />}
      </main>

      <footer className="site-footer">
        <div className="footer-top page-width">
          <div className="footer-brand">
            <Brand light />
            <p>Good food starts close to home.<br />Grown with care, shared with purpose.</p>
          </div>
          <div className="footer-column"><strong>Explore</strong><a href="/shop">Shop all</a><a href="/shop">Fresh picks</a><a href="/about">Our story</a></div>
          <div className="footer-column"><strong>Here to help</strong><a href="/cart">Delivery & pickup</a><a href="/about">FAQs</a><a href="/login">My account</a></div>
          <div className="footer-contact"><span className="eyebrow eyebrow-light">GOOD TO SEE YOU HERE</span><p>Questions about the harvest?<br />We’d love to hear from you.</p><a href="mailto:hello@grassroutes.example">hello@grassroutes.example <Icon name="arrow" size={15} /></a></div>
        </div>
        <div className="footer-bottom page-width">
          <span>© 2026 Grassroutes. Grown with care.</span>
          <span>Made closer to home <Icon name="heart" size={14} /></span>
        </div>
      </footer>

      {toast && <div className="toast" role="status"><span><Icon name="check" size={16} /></span>{toast}</div>}
    </>
  );
}

export default App;
