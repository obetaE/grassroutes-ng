import { useState } from 'react';

const pickupLocations = [
  { name: 'Obio Akpor Local Government Council', address: 'Ikwerre Rd, Rumuodomaya, Port Harcourt 500102, Rivers', area: 'Obio Akpor' },
  { name: 'Garden City Market Collection Point', address: 'Rumuola Road, Port Harcourt 500272, Rivers', area: 'Port Harcourt' },
  { name: 'Fresh Roots Community Hub', address: 'Peter Odili Road, Port Harcourt 500101, Rivers', area: 'Port Harcourt' },
  { name: 'Riverside Neighbourhood Market', address: 'Woji Road, Port Harcourt 500102, Rivers', area: 'Obio Akpor' },
  { name: 'Green Valley Farm Stand', address: 'Eleme Junction, Port Harcourt 500101, Rivers', area: 'Eleme' },
  { name: 'Little Acre Community Pickup', address: 'Rumuokoro, Port Harcourt 500272, Rivers', area: 'Obio Akpor' },
];

function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="subpage-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

function ShopPage({ Icon, money, ProductCard, onAdd, searchTerm, onSearchChange, products }) {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');
  const [query, setQuery] = useState(searchTerm || params.get('q') || '');
  const [category, setCategory] = useState(
    ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy & eggs', 'Meat & fish'].includes(requestedCategory)
      ? requestedCategory
      : 'All',
  );
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesQuery = `${product.name} ${product.category} ${product.farm}`
      .toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <section className="shop-page-hero">
        <div className="page-width shop-page-hero-inner">
          <div>
            <span className="eyebrow eyebrow-light">GOOD THINGS, GROWN NEARBY</span>
            <h1>Shop the harvest.</h1>
            <p>A fresh little something for your table, straight from the people who grow it.</p>
            <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Shop</span></div>
          </div>
          <span className="shop-hero-stamp"><Icon name="leaf" size={26} /><span>Fresh picks,<br />close to home.</span></span>
        </div>
      </section>
      <section className="shop-page-content section-pad">
        <div className="shop-page-toolbar">
          <div>
            <span className="eyebrow">THE DAY’S GOOD PICKS</span>
            <h2>{query ? `Fresh finds for “${query}”` : category === 'All' ? 'A little of everything.' : `${category}.`}</h2>
            <p>{filtered.length} good {filtered.length === 1 ? 'pick' : 'picks'} to choose from</p>
          </div>
          <form className="shop-inline-search" onSubmit={(event) => {
            event.preventDefault();
            window.history.replaceState({}, '', `/shop?q=${encodeURIComponent(query.trim())}`);
          }}>
            <Icon name="search" size={18} />
            <input
              aria-label="Search shop"
              placeholder="Find something fresh..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                onSearchChange(event.target.value);
              }}
            />
          </form>
        </div>
        <div className="category-filter shop-page-filters" role="group" aria-label="Filter products by category">
          {['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy & eggs', 'Meat & fish'].map((name) => (
            <button
              key={name}
              type="button"
              className={category === name ? 'filter-active' : ''}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}{name === 'All' && <span>{products.length}</span>}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <div className="product-grid shop-page-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} onShow={() => { window.location.href = `/product/${product.id}`; }} />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <Icon name="search" size={22} />
            <p>No fresh picks match “{query.trim()}”.</p>
            <button onClick={() => { onSearchChange(''); setCategory('All'); }}>Browse all produce</button>
          </div>
        )}
      </section>
      <section className="shop-note">
        <Icon name="leaf" size={23} />
        <p>New harvests arrive often. <a href="/about">Get to know the people growing yours.</a></p>
      </section>
    </>
  );
}

function ProductPage({ Icon, money, product, onAdd }) {
  const options = product.unitOptions || [{ label: product.unit, price: product.price }];
  const [selectedUnit, setSelectedUnit] = useState(options[0]);
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState('');
  const [promoStatus, setPromoStatus] = useState('');
  const [discount, setDiscount] = useState(0);
  const salePrice = Math.round(selectedUnit.price * (1 - discount / 100));

  const applyPromo = () => {
    if (['FRESH10', 'GRASS10'].includes(promo.trim().toLocaleUpperCase())) {
      setDiscount(10);
      setPromoStatus('Lovely! Your 10% discount has been applied.');
    } else {
      setDiscount(0);
      setPromoStatus('That code isn’t quite right. Try FRESH10 or GRASS10.');
    }
  };

  return (
    <section className="product-page section-pad">
      <div className="page-width">
        <div className="breadcrumb product-breadcrumb"><a href="/">Home</a><span>/</span><a href="/shop">Shop</a><span>/</span><span>{product.name}</span></div>
        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <a className="product-back" href="/shop" aria-label="Back to shop">←</a>
            <span className="product-image-logo"><Icon name="leaf" size={24} /></span>
            {product.badge && <span className="product-detail-badge">{product.badge}</span>}
            <span className="product-detail-farm"><Icon name="leaf" size={15} /> Grown with care at {product.farm}</span>
          </div>
          <div className="product-detail-card">
            <span className="eyebrow">{product.category.toUpperCase()} · FROM {product.farm.toUpperCase()}</span>
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            <span className="stock-label"><span /> Stock available: {product.stock}</span>
            <div className="product-detail-price">
              <span>Price:</span>
              {product.originalPrice && selectedUnit.label === 'Counter' && <del>{money(product.originalPrice)}</del>}
              <strong>{money(salePrice)}</strong>
              {discount > 0 && <span className="discount-tag">{discount}% off</span>}
              <small>/ {selectedUnit.label}</small>
            </div>
            {options.length > 1 && (
              <fieldset className="unit-picker">
                <legend>Units:</legend>
                <div>{options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={selectedUnit.label === option.label ? 'unit-selected' : ''}
                    aria-pressed={selectedUnit.label === option.label}
                    onClick={() => { setSelectedUnit(option); setDiscount(0); setPromoStatus(''); }}
                  >{option.label}</button>
                ))}</div>
              </fieldset>
            )}
            <div className="minimum-quantity">Minimum quantity: 1</div>
            <div className="detail-quantity-row">
              <div className="quantity-control detail-quantity" aria-label={`Quantity of ${product.name}`}>
                <button aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}><Icon name="plus" size={16} /></button>
                <span>{quantity}</span>
                <button aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Icon name="minus" size={16} /></button>
              </div>
              <span className="detail-total">Total <strong>{money(salePrice * quantity)}</strong></span>
            </div>
            <form className="promo-form" onSubmit={(event) => { event.preventDefault(); applyPromo(); }}>
              <div className="promo-input-row">
                <input aria-label="Promo code" placeholder="Enter promo code here" value={promo} onChange={(event) => setPromo(event.target.value)} />
                <button type="submit">Apply</button>
              </div>
              {promoStatus && <span className={`promo-message${discount ? ' promo-success' : ''}`} role="status">{promoStatus}</span>}
              <small>Try FRESH10 for 10% off your order.</small>
            </form>
            <button className="button button-primary detail-add-button" onClick={() => {
              onAdd(product, { ...selectedUnit, price: salePrice }, quantity);
              window.location.href = '/cart';
            }}>
              Add to basket <Icon name="bag" size={18} />
            </button>
            <p className="detail-delivery-note"><Icon name="truck" size={16} /> Freshly packed for pickup or local delivery.</p>
          </div>
        </div>
        <div className="product-bottom-note">
          <Icon name="heart" size={20} />
          <span>Good food has good roots. This harvest comes from <strong>{product.farm}</strong>.</span>
          <a href="/shop">Keep exploring <Icon name="arrow" size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function CartPage({ Icon, money, cart, onQuantity, onRemove }) {
  const items = Object.values(cart);
  const [delivery, setDelivery] = useState(() => window.sessionStorage.getItem('grassroutes-delivery') || 'Pickup');
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = delivery === 'Home delivery' && items.length > 0 ? 1000 : 0;

  const chooseDelivery = (option) => {
    setDelivery(option);
    window.sessionStorage.setItem('grassroutes-delivery', option);
  };

  return (
    <section className="cart-page section-pad">
      <div className="page-width">
        <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Your basket</span></div>
        <PageHeading eyebrow="YOUR HARVEST" title="Your basket." />
        {!items.length ? (
          <div className="cart-page-empty">
            <div className="empty-cart-icon"><Icon name="bag" size={34} /></div>
            <span className="eyebrow">NOTHING IN THE BASKET, JUST YET</span>
            <h2>A little room for something fresh.</h2>
            <p>Your basket is empty. Take a look at what’s just come in from our growers.</p>
            <a className="button button-primary" href="/shop">Continue shopping <Icon name="arrow" size={17} /></a>
          </div>
        ) : (
          <div className="cart-page-layout">
            <section className="cart-page-items">
              <div className="cart-table-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Total</span></div>
              {items.map((item) => (
                <article className="cart-page-item" key={item.cartKey || item.id}>
                  <a className="cart-product-link" href={`/product/${item.productId || item.id}`}><img src={item.image} alt="" /></a>
                  <div className="cart-product-name">
                    <span className="product-category">{item.category} · {item.farm}</span>
                    <h2><a href={`/product/${item.productId || item.id}`}>{item.name}</a></h2>
                    <span className="cart-unit-label">Unit: {item.selectedUnit || item.unit}</span>
                    <button className="remove-item cart-remove" onClick={() => onRemove(item.cartKey || item.id)}>Remove</button>
                  </div>
                  <strong className="cart-page-price">{money(item.price)}</strong>
                  <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                    <button aria-label="Decrease quantity" onClick={() => onQuantity(item.cartKey || item.id, -1)}><Icon name="minus" size={15} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => onQuantity(item.cartKey || item.id, 1)}><Icon name="plus" size={15} /></button>
                  </div>
                  <strong className="cart-line-total">{money(item.price * item.quantity)}</strong>
                </article>
              ))}
              <a className="text-link cart-continue" href="/shop">← Continue shopping</a>
            </section>
            <aside className="cart-page-summary">
              <span className="eyebrow eyebrow-light">THE GOOD STUFF, ADDED UP</span>
              <h2>Cart summary</h2>
              <div className="cart-page-totals">
                <div><span>Cart total</span><strong>{money(subtotal)}</strong></div>
                <div><span>{delivery === 'Home delivery' ? 'Shipping' : 'Pickup'}</span><strong>{deliveryFee ? money(deliveryFee) : 'Free'}</strong></div>
                <div className="cart-grand-total"><span>Estimated total</span><strong>{money(subtotal + deliveryFee)}</strong></div>
              </div>
              <span className="summary-delivery-label">How would you like your order?</span>
              <button className={`summary-delivery${delivery === 'Pickup' ? ' delivery-selected' : ''}`} onClick={() => chooseDelivery('Pickup')}>
                <span className="radio-indicator">{delivery === 'Pickup' && <span />}</span><span>Pick up</span><small>Free · Choose a collection point</small>
              </button>
              <button className={`summary-delivery${delivery === 'Home delivery' ? ' delivery-selected' : ''}`} onClick={() => chooseDelivery('Home delivery')}>
                <span className="radio-indicator">{delivery === 'Home delivery' && <span />}</span><span>Home delivery</span><small>₦1,000 · To your doorstep</small>
              </button>
              <a className="button button-primary cart-checkout-button" href={delivery === 'Pickup' ? '/delivery' : '/checkout'}>{delivery === 'Pickup' ? 'Choose a pickup point' : 'Continue to checkout'} <Icon name="arrow" size={17} /></a>
              <p>Frontend demo only. No payment details are collected.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function DeliveryPage({ Icon }) {
  const [area, setArea] = useState('All available locations');
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState('');
  const options = ['All available locations', 'Obio Akpor', 'Port Harcourt', 'Eleme'];
  const matches = pickupLocations.filter((place) => (
    (area === options[0] || place.area === area)
    && `${place.name} ${place.address} ${place.area}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  ));

  return (
    <section className="delivery-page section-pad">
      <div className="page-width">
        <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="/cart">Your basket</a><span>/</span><span>Pickup point</span></div>
        <PageHeading eyebrow="THE LAST LITTLE CHOICE" title="Choose your pickup point." description="Pick a nearby spot that works for you. Free pickup, always." />
        <div className="delivery-progress"><span className="progress-done"><Icon name="check" size={14} /> Basket</span><span className="progress-line" /><span className="progress-current">Pickup point</span><span className="progress-line" /><span>Checkout</span></div>
        <div className="delivery-workspace">
          <div className="delivery-locations">
            <div className="pickup-intro"><span className="eyebrow">PICKUP, YOUR WAY</span><h2>Find your spot.</h2><p>Choose from our local Grassroutes collection points.</p></div>
            <label className="location-search"><Icon name="search" size={18} /><input aria-label="Search collection points" placeholder="Search by area or address" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
            <label className="location-filter-label" htmlFor="location-area">Filter by area</label>
            <select id="location-area" value={area} onChange={(event) => setArea(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select>
            <div className="location-list">
              {matches.length ? matches.map((place) => (
                <button key={place.name} className={`location-card${location?.name === place.name ? ' location-selected' : ''}`} onClick={() => setLocation(place)}>
                  <span className="location-pin"><Icon name="pin" size={21} /></span>
                  <span className="location-copy"><strong>{place.name}</strong><small>{place.address}</small><span className="location-hours">Open today · 9am–5pm</span></span>
                  <span className="radio-indicator">{location?.name === place.name && <span />}</span>
                </button>
              )) : <p className="location-no-results">No pickup points match that search. Try a nearby area.</p>}
            </div>
          </div>
          <aside className="delivery-summary">
            <span className="eyebrow eyebrow-light">YOUR BASKET</span><h2>Pickup, all sorted.</h2>
            <div><span>Collection</span><strong>{location ? location.area : 'Choose a point'}</strong></div>
            {location && <p className="selected-location-summary">{location.name}<br />{location.address}</p>}
            <div><span>Pickup fee</span><strong>Free</strong></div>
            <div className="delivery-summary-note"><Icon name="check" size={17} /> Your order will be ready at the selected collection point.</div>
            <button className="button button-primary" disabled={!location} onClick={() => {
              window.sessionStorage.setItem('grassroutes-delivery', 'Pickup');
              window.sessionStorage.setItem('grassroutes-location', JSON.stringify(location));
              window.location.href = '/checkout';
            }}>Continue to checkout <Icon name="arrow" size={17} /></button>
            <a className="text-link" href="/cart">← Back to your basket</a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CheckoutPage({ Icon, money, cart, onComplete }) {
  const items = Object.values(cart);
  const delivery = window.sessionStorage.getItem('grassroutes-delivery') || 'Pickup';
  let location = null;
  try {
    location = JSON.parse(window.sessionStorage.getItem('grassroutes-location') || 'null');
  } catch (error) {
    console.error('Could not read the selected pickup location.', error);
  }
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = delivery === 'Home delivery' && items.length ? 1000 : 0;
  const [error, setError] = useState('');

  if (!items.length) {
    return <section className="checkout-page section-pad"><div className="page-width cart-page-empty"><span className="eyebrow">READY WHEN YOU ARE</span><h1>Your basket is empty.</h1><p>Add a few fresh picks before you head to checkout.</p><a className="button button-primary" href="/shop">Browse the harvest <Icon name="arrow" size={17} /></a></div></section>;
  }

  return (
    <section className="checkout-page section-pad">
      <div className="page-width">
        <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="/cart">Your basket</a><span>/</span><span>Checkout</span></div>
        <PageHeading eyebrow="THE HOME STRETCH" title="A few details, then the good stuff." description="You’re just about there. This is a frontend demo—your details won’t be sent anywhere." />
        <div className="delivery-progress"><span className="progress-done"><Icon name="check" size={14} /> Basket</span><span className="progress-line" /><span className={delivery === 'Pickup' ? 'progress-done' : 'progress-current'}>{delivery === 'Pickup' ? location?.area || 'Pickup point' : 'Home delivery'}</span><span className="progress-line" /><span className="progress-current">Checkout</span></div>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={(event) => {
            event.preventDefault();
            if (delivery === 'Pickup' && !location) {
              setError('Please choose a pickup point before placing your demo order.');
              return;
            }
            const form = new FormData(event.currentTarget);
            onComplete({
              id: `GR-${Date.now().toString().slice(-6)}`,
              total: subtotal + fee,
              delivery,
              location: location?.name || form.get('address'),
              name: form.get('name'),
              email: form.get('email'),
              count: items.reduce((sum, item) => sum + item.quantity, 0),
              payment: form.get('payment'),
            });
          }}>
            <div className="checkout-form-heading"><span className="checkout-step-number">01</span><div><h2>Your details</h2><p>Just the basics, so your harvest finds its way.</p></div></div>
            <div className="checkout-fields">
              <label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
              <label>Email address<input name="email" autoComplete="email" type="email" required placeholder="you@example.com" /></label>
              <label>Mobile number<input name="phone" autoComplete="tel" type="tel" required placeholder="+234 800 000 0000" /></label>
              {delivery === 'Home delivery' ? (
                <label className="checkout-field-wide">Delivery address<textarea name="address" autoComplete="street-address" required placeholder="House number, street, neighbourhood and city" rows="3" /></label>
              ) : (
                <div className="checkout-pickup-location checkout-field-wide"><Icon name="pin" size={19} /><span><strong>{location?.name || 'No pickup point selected yet'}</strong><small>{location?.address || 'Please choose a pickup point to continue.'}</small></span><a href="/delivery">Change</a></div>
              )}
            </div>
            <div className="checkout-form-heading payment-heading"><span className="checkout-step-number">02</span><div><h2>How would you like to pay?</h2><p>Pick a demo payment option. No card data is requested.</p></div></div>
            <div className="payment-options">
              <label><input type="radio" name="payment" value="Pay on pickup" defaultChecked={delivery === 'Pickup'} /><span><Icon name="bag" size={19} /><strong>Pay on pickup</strong><small>Settle when you collect your order</small></span></label>
              <label><input type="radio" name="payment" value="Pay on delivery" defaultChecked={delivery === 'Home delivery'} /><span><Icon name="card" size={19} /><strong>Pay on delivery</strong><small>Settle when your harvest arrives</small></span></label>
            </div>
            {error && <p className="checkout-error" role="alert">{error}</p>}
            <button className="button button-primary place-order-button" type="submit">Place demo order <Icon name="arrow" size={17} /></button>
            <p className="checkout-demo-note">Demo only. Nothing is charged, ordered, or sent to a server.</p>
          </form>
          <aside className="checkout-order-summary"><span className="eyebrow">A GOOD THING, COMING UP</span><h2>Your order</h2>
            <div className="checkout-mini-items">{items.map((item) => <div key={item.cartKey || item.id}><span className="checkout-item-quantity">{item.quantity}</span><span>{item.name}<small>{item.selectedUnit || item.unit}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}</div>
            <div className="checkout-order-totals"><div><span>Cart total</span><strong>{money(subtotal)}</strong></div><div><span>{delivery === 'Home delivery' ? 'Shipping' : 'Pickup'}</span><strong>{fee ? money(fee) : 'Free'}</strong></div><div className="checkout-total"><span>Sum total</span><strong>{money(subtotal + fee)}</strong></div></div>
            <div className="checkout-fresh-note"><Icon name="leaf" size={18} /> Grown nearby. Gathered with care.</div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OrderStatusPage({ Icon, money }) {
  let order = null;
  try {
    order = JSON.parse(window.sessionStorage.getItem('grassroutes-order') || 'null');
  } catch (error) {
    console.error('Could not read the demo order details.', error);
  }
  if (!order) return <section className="order-status-page section-pad"><div className="page-width cart-page-empty"><span className="eyebrow">NOTHING TO TRACK JUST YET</span><h1>Your next good thing starts here.</h1><p>Place a demo order and your order status will appear here.</p><a className="button button-primary" href="/shop">Shop the harvest <Icon name="arrow" size={17} /></a></div></section>;

  return (
    <section className="order-status-page section-pad"><div className="page-width">
      <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Order status</span></div>
      <PageHeading eyebrow="A GOOD THING IS GROWING" title="Order status." description="Your demo order has been noted. Here’s what happens next." />
      <div className="order-status-layout">
        <div>
          <section className="order-status-summary"><div><span className="eyebrow eyebrow-light">ORDER DETAILS</span><span className="order-paid-pill">Demo order</span></div><h2>Thanks, {order.name?.split(' ')[0] || 'friend'}.</h2><div><span>Order total</span><strong>{money(order.total)}</strong></div><div><span>Order reference</span><strong>{order.id}</strong></div><div><span>Delivery choice</span><strong>{order.delivery === 'Pickup' ? 'Pickup' : 'Home delivery'}</strong></div></section>
          <section className="order-customer-card"><span className="eyebrow">GOING TO A GOOD HOME</span><h2>{order.name}</h2><p>{order.email}</p><p>{order.location}</p><span>{order.count} {order.count === 1 ? 'item' : 'items'} in this demo order</span></section>
        </div>
        <section className="order-timeline-card"><span className="eyebrow">YOUR HARVEST’S JOURNEY</span><h2>Good things take root.</h2><div className="order-page-timeline"><div className="order-page-step step-done"><span><Icon name="check" size={15} /></span><div><strong>Order noted</strong><small>Your demo order is ready to grow</small></div></div><div className="order-page-step"><span>02</span><div><strong>Farm-fresh packing</strong><small>Your growers gather your picks</small></div></div><div className="order-page-step"><span>03</span><div><strong>{order.delivery === 'Pickup' ? 'Ready for pickup' : 'On its way'}</strong><small>{order.location || 'Coming your way, soon'}</small></div></div><div className="order-page-step"><span>04</span><div><strong>Received with a smile</strong><small>Fresh food, happy table</small></div></div></div><p className="frontend-note">This order status is a local frontend demonstration. No order has been sent.</p><a className="button button-primary" href="/shop">More good picks <Icon name="arrow" size={17} /></a></section>
      </div>
    </div></section>
  );
}

function AccountPage({ Icon }) {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const heading = {
    '/login': ['GOOD TO HAVE YOU HERE', 'Welcome back.', 'Sign in to your Grassroutes account.'],
    '/register': ['A LITTLE CLOSER TO GOOD FOOD', 'Come on in.', 'Create your Grassroutes account.'],
    '/forgot-password': ['A LITTLE RESET', 'Forgot password?', 'Enter your email and we’ll get you back on your way.'],
    '/verification': ['ONE LITTLE CHECK', 'Check your email.', 'Enter the six-digit demo code to keep going.'],
    '/change-password': ['A FRESH START', 'Choose a new password.', 'Create a new password for your account.'],
  }[path] || ['A LITTLE RESET', 'Welcome back.', 'Your account'];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if ((path === '/register' || path === '/change-password') && form.get('password') !== form.get('confirmPassword')) {
      setMessage('Those passwords don’t match yet. Give it another try.');
      return;
    }
    if (path === '/forgot-password') {
      setSuccess(true);
      setMessage('Demo only: no email has been sent. Continue to the verification preview below.');
      return;
    }
    if (path === '/verification') {
      setSuccess(true);
      setMessage('Demo code accepted. You can continue to choose a new password.');
      return;
    }
    setSuccess(true);
    setMessage('This is a frontend preview. Your account details were not sent or saved.');
  };

  const isForgot = path === '/forgot-password';
  const isVerify = path === '/verification';
  const isChangePassword = path === '/change-password';
  const isRegister = path === '/register';

  return (
    <section className="account-page section-pad">
      <div className="account-page-bg" />
      <div className="account-page-card">
        <div className="account-page-aside"><a className="brand brand-light" href="/"><span className="brand-mark"><Icon name="leaf" size={24} /></span><span>grassroutes</span></a><span className="eyebrow eyebrow-light">{heading[0]}</span><h1>{heading[1]}</h1><p>{heading[2]}</p><span className="account-page-aside-bottom">Good food starts close to home.</span></div>
        <div className="account-page-form-panel">
          {success ? (
            <div className="account-page-success"><span className="success-icon"><Icon name="check" size={22} /></span><span className="eyebrow">ALL GOOD</span><h2>{isForgot ? 'Check in to continue.' : isVerify ? 'That’s verified.' : 'You’re all set.'}</h2><p>{message}</p>{isForgot && <a className="button button-primary" href="/verification">Continue to verification <Icon name="arrow" size={17} /></a>}{isVerify && <a className="button button-primary" href="/change-password">Choose a new password <Icon name="arrow" size={17} /></a>}{!isForgot && !isVerify && <a className="button button-primary" href="/shop">Back to shopping <Icon name="arrow" size={17} /></a>}</div>
          ) : (
            <>
              <span className="eyebrow">{heading[0]}</span><h2>{isVerify ? 'Enter your verification code' : heading[1]}</h2><p className="account-page-intro">{heading[2]}</p>
              <form className="account-form account-page-form" onSubmit={handleSubmit}>
                {isRegister && <label>Full name<input name="name" autoComplete="name" required placeholder="Your full name" /></label>}
                {!isChangePassword && <label>{isVerify ? 'Verification code' : 'Email address'}<input name={isVerify ? 'code' : 'email'} type={isVerify ? 'text' : 'email'} inputMode={isVerify ? 'numeric' : 'email'} pattern={isVerify ? '[0-9]{6}' : undefined} maxLength={isVerify ? 6 : undefined} autoComplete={isVerify ? 'one-time-code' : 'email'} required placeholder={isVerify ? '000 000' : 'you@example.com'} /></label>}
                {!isForgot && !isVerify && <label>{isChangePassword ? 'New password' : 'Password'}<input name="password" type="password" autoComplete={isChangePassword || isRegister ? 'new-password' : 'current-password'} minLength={6} required placeholder="At least 6 characters" /></label>}
                {(isRegister || isChangePassword) && <label>Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" minLength={6} required placeholder="Enter your password again" /></label>}
                {isRegister && <label>Mobile number<input name="phone" type="tel" autoComplete="tel" required placeholder="+234 800 000 0000" /></label>}
                {message && <p className="checkout-error" role="alert">{message}</p>}
                <button className="button button-primary account-submit" type="submit">{isForgot ? 'Send verification link' : isVerify ? 'Confirm verification code' : isRegister ? 'Create my account' : isChangePassword ? 'Change my password' : 'Sign in'} <Icon name="arrow" size={17} /></button>
              </form>
              {isForgot && <p className="auth-note">In this frontend demo, no email is actually sent.</p>}
              {isVerify && <p className="auth-note">Use any six digits for this local demo.</p>}
              <div className="account-route-links">
                {path !== '/login' && <a href="/login">Already have an account? <strong>Sign in</strong></a>}
                {path !== '/register' && <a href="/register">New to Grassroutes? <strong>Create account</strong></a>}
                {path !== '/forgot-password' && !isRegister && !isChangePassword && <a href="/forgot-password">Forgot your password?</a>}
                {isChangePassword && <a href="/login">Already have an account? <strong>Sign in</strong></a>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ Icon }) {
  return (
    <>
      <section className="about-page-hero"><div className="page-width"><span className="eyebrow eyebrow-light">GOOD FOOD HAS GOOD ROOTS</span><h1>A little closer<br />to <em>home.</em></h1><p>Meet the idea behind Grassroutes: good food, thoughtful growing, and the people who bring it to your table.</p><div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Our story</span></div></div></section>
      <section className="about-story section-pad"><div className="about-story-image"><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85" alt="Warm morning light over a farm field" loading="lazy" /></div><div className="about-story-copy"><span className="eyebrow">A BETTER KIND OF GROCERY RUN</span><h2>Fresh food. Familiar roots.</h2><p>We believe knowing where your food comes from should feel simple. Grassroutes brings local growers and everyday shoppers a little closer together.</p><p>From the first careful pick to the last mile home, we want every part of your food’s journey to feel thoughtful, honest, and worth coming back to.</p><a className="button button-primary" href="/shop">Meet the harvest <Icon name="arrow" size={17} /></a></div></section>
      <section className="about-values section-pad" id="our-values"><div className="section-heading"><div><span className="eyebrow">A FEW THINGS WE BELIEVE</span><h2>Good growing matters.</h2></div></div><div className="about-values-grid"><article><span>01</span><Icon name="leaf" size={25} /><h3>Care in every harvest</h3><p>Thoughtful growing and well-loved produce, picked at its best.</p></article><article><span>02</span><Icon name="heart" size={25} /><h3>People behind the produce</h3><p>Independent local growers deserve to be part of the story.</p></article><article><span>03</span><Icon name="truck" size={25} /><h3>Closer feels better</h3><p>A simpler way to bring farm-fresh food to your table.</p></article></div></section>
      <section className="about-cta"><span className="eyebrow eyebrow-light">FRESH THINGS ARE GROWING</span><h2>Come find your fresh.</h2><a className="button button-primary" href="/shop">Shop the harvest <Icon name="arrow" size={17} /></a></section>
    </>
  );
}

export default function StorePages(props) {
  const { pathname, products, Icon, money, ProductCard, cart, onAdd, onQuantity, onRemove, onComplete, searchTerm, onSearchChange } = props;

  if (pathname === '/shop') return <ShopPage {...{ Icon, money, ProductCard, onAdd, searchTerm, onSearchChange, products }} />;
  if (pathname.startsWith('/product/')) {
    const product = products.find((item) => item.id === Number(pathname.split('/').pop()));
    return product ? <ProductPage {...{ Icon, money, product, onAdd }} /> : <NotFound />;
  }
  if (pathname === '/cart') return <CartPage {...{ Icon, money, cart, onQuantity, onRemove }} />;
  if (pathname === '/delivery') return <DeliveryPage Icon={Icon} />;
  if (pathname === '/checkout') return <CheckoutPage {...{ Icon, money, cart, onComplete }} />;
  if (pathname === '/order-status') return <OrderStatusPage {...{ Icon, money }} />;
  if (['/login', '/register', '/forgot-password', '/verification', '/change-password'].includes(pathname)) return <AccountPage Icon={Icon} />;
  if (pathname === '/about') return <AboutPage Icon={Icon} />;
  return <NotFound />;
}

function NotFound() {
  return <section className="cart-page-empty not-found-page"><span className="eyebrow">THIS LITTLE PATH ENDS HERE</span><h1>We couldn’t find that page.</h1><p>The good news? There’s plenty to discover back at the harvest.</p><a className="button button-primary" href="/shop">Back to the shop</a></section>;
}
