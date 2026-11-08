/*
 * Kontributor:
 * Bert — Pengembangan aplikasi Mytcha POS
 */
import { orderService } from "./services/orderService";
import { menuService } from "./services/menuService";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Home as HomeIcon,
  Leaf,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  QrCode,
  Copy,
  X,
  ScanLine,
  Wallet,
  Banknote,
} from "lucide-react";
import { products, formatRupiah } from "./data/products";

const GREEN = "#405a30";

const TOPPINGS = [
  "Extra Matcha Powder",
  "Boba",
  "Whipped Cream",
];

const defaultOptions = {
  sugar: 50,
  ice: "Normal",
  milk: "Susu Sapi",
  toppings: [],
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function ProductImage({ src, name, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const title = (name || "").toLowerCase();
  const dessert = /bread|cake|tiramisu|cookie/.test(title);
  const ube = title.includes("ube");
  const berry = title.includes("berry");
  const hojicha = title.includes("hojicha");
  const coffee = title.includes("dirty");
  const coconut = title.includes("coconut");
  const corn = title.includes("corn");
  const salt = title.includes("sea salt");

  const primary = ube
    ? "#A585C9"
    : berry
    ? "#CE8199"
    : hojicha
    ? "#A77E52"
    : coffee
    ? "#927051"
    : "#779B48";

  const secondary = ube
    ? "#E4D4F2"
    : berry
    ? "#F6D1DB"
    : corn
    ? "#F3DD9C"
    : coconut
    ? "#F0E9D7"
    : "#DCE8B7";

  const label = (name || "Matcha House")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;");

  const decoration = dessert
    ? `
      <ellipse cx="200" cy="345" rx="145" ry="25" fill="#314024" opacity=".12"/>
      <ellipse cx="200" cy="332" rx="138" ry="22" fill="#FDF9EF"/>
      ${
        title.includes("bread")
          ? `
          <g transform="translate(80 145)">
            <path d="M15 90 Q30 5 115 25 Q195 5 210 90 Q220 145 117 165 Q5 145 15 90Z"
              fill="#C88F4D"/>
            <path d="M32 87 Q53 31 116 42 Q175 25 193 88"
              fill="none" stroke="#F3D195" stroke-width="22" stroke-linecap="round"/>
            <path d="M65 55 Q90 80 80 125 M140 45 Q120 85 145 135"
              stroke="#A86C31" fill="none" stroke-width="7" opacity=".55"/>
          </g>
          `
          : title.includes("cookie")
          ? `
          <g>
            <ellipse cx="205" cy="285" rx="117" ry="45" fill="#A5764C"/>
            <path d="M92 278 Q80 210 153 202 Q189 173 230 199 Q300 191 319 254 Q339 311 254 325 Q150 347 92 278Z"
              fill="${ube ? "#A989C1" : "#BD8B58"}"/>
            <g fill="${ube ? "#6B4B82" : "#735039"}">
              <circle cx="155" cy="245" r="10"/>
              <circle cx="234" cy="229" r="9"/>
              <circle cx="270" cy="277" r="12"/>
              <circle cx="187" cy="295" r="8"/>
            </g>
          </g>
          `
          : `
          <g>
            <path d="M100 295 L185 135 Q200 119 222 143 L313 295Z"
              fill="${primary}"/>
            <path d="M112 278 L190 150 L290 278Z"
              fill="#F3E9CD" opacity=".9"/>
            <path d="M114 248 L190 150 L271 248Z"
              fill="${primary}" opacity=".86"/>
            <path d="M100 295 Q208 315 313 295 L313 315 Q205 339 100 315Z"
              fill="#D9C49B"/>
            <path d="M183 137 Q213 112 241 150"
              fill="none" stroke="#FFF7E8" stroke-width="20" stroke-linecap="round"/>
          </g>
          `
      }
    `
    : `
      <ellipse cx="200" cy="366" rx="119" ry="25" fill="#26391B" opacity=".15"/>
      <ellipse cx="200" cy="358" rx="117" ry="20" fill="#B49066"/>
      <ellipse cx="200" cy="353" rx="106" ry="15" fill="#E7CC9D"/>

      <defs>
        <linearGradient id="drink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${secondary}"/>
          <stop offset=".48" stop-color="#F5EAD0"/>
          <stop offset=".49" stop-color="${primary}"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stop-color="white" stop-opacity=".45"/>
          <stop offset=".3" stop-color="white" stop-opacity=".06"/>
          <stop offset=".8" stop-color="white" stop-opacity=".04"/>
          <stop offset="1" stop-color="white" stop-opacity=".4"/>
        </linearGradient>
      </defs>

      <path d="M115 115 L285 115 L266 330 Q200 352 134 330Z"
        fill="url(#drink)"/>
      <path d="M115 115 L285 115 L266 330 Q200 352 134 330Z"
        fill="url(#glass)" stroke="#FFFFFF" stroke-width="5"/>

      <g fill="#FFFFFF" fill-opacity=".34" stroke="#FFFFFF" stroke-opacity=".65">
        <rect x="139" y="143" width="43" height="41" rx="8" transform="rotate(17 139 143)"/>
        <rect x="211" y="154" width="44" height="41" rx="8" transform="rotate(-18 211 154)"/>
        <rect x="159" y="211" width="40" height="40" rx="8" transform="rotate(-9 159 211)"/>
        <rect x="220" y="230" width="35" height="35" rx="7" transform="rotate(13 220 230)"/>
      </g>

      <ellipse cx="200" cy="115" rx="85" ry="21" fill="#E5ECCC"/>
      <ellipse cx="200" cy="111" rx="77" ry="16" fill="${primary}"/>

      ${
        salt
          ? `<path d="M127 112 Q155 73 184 96 Q210 65 235 96 Q269 78 278 113"
               fill="#FFF7EC" stroke="#FFF7EC" stroke-width="14"/>`
          : ""
      }

      <path d="M150 110 Q176 96 195 113 Q226 94 250 111"
        fill="none" stroke="${secondary}" stroke-width="9" opacity=".85"/>

      <path d="M136 138 Q139 245 150 307"
        stroke="white" stroke-width="7" opacity=".35" fill="none"
        stroke-linecap="round"/>
    `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="440" viewBox="0 0 400 440">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#F2EEDD"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
      </defs>

      <rect width="400" height="440" fill="url(#bg)"/>

      <circle cx="344" cy="65" r="110" fill="#FFFFFF" opacity=".24"/>
      <circle cx="39" cy="355" r="110" fill="#79945A" opacity=".12"/>

      <g opacity=".32" fill="#62864D">
        <ellipse cx="55" cy="72" rx="17" ry="45" transform="rotate(-35 55 72)"/>
        <ellipse cx="83" cy="45" rx="14" ry="38" transform="rotate(30 83 45)"/>
        <ellipse cx="340" cy="330" rx="16" ry="53" transform="rotate(35 340 330)"/>
        <ellipse cx="364" cy="380" rx="13" ry="42" transform="rotate(-30 364 380)"/>
      </g>

      ${decoration}

      <rect x="76" y="385" width="248" height="33" rx="16"
        fill="#FFFFFF" opacity=".65"/>
      <text x="200" y="406" text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="13" font-weight="bold" fill="#405A30">
        ${label}
      </text>
    </svg>
  `;

  const illustration =
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <img
      src={failed ? illustration : src}
      alt={name}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function BackButton({ to = "/home" }) {
  return (
    <Link to={to} className="back-button">
      <ArrowLeft size={22} />
    </Link>
  );
}

function BottomNav({ count }) {
  const links = [
    { to: "/home", label: "Home", Icon: HomeIcon },
    { to: "/cart", label: "Keranjang", Icon: ShoppingCart },
    { to: "/history", label: "Riwayat", Icon: Clock3 },
  ];

  return (
    <nav className="bottom-nav">
      {links.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <div className="nav-icon">
            <Icon size={23} />
            {label === "Keranjang" && count > 0 && (
              <span className="cart-badge">{count}</span>
            )}
          </div>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function OptionSelector({ title, values, value, onChange }) {
  return (
    <div className="option-group">
      <h4>{title}</h4>
      <div className="option-list">
        {values.map((option) => (
          <button
            key={option}
            type="button"
            className={`option-pill ${
              value === option ? "selected" : ""
            }`}
            onClick={() => onChange(option)}
          >
            {typeof option === "number" ? `${option}%` : option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CustomizeForm({ options, setOptions }) {
  function update(key, value) {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTopping(topping) {
    const selected = options.toppings.includes(topping);

    update(
      "toppings",
      selected
        ? options.toppings.filter((item) => item !== topping)
        : [...options.toppings, topping]
    );
  }

  return (
    <div className="customize-form">
      <h3>Customize Pesanan</h3>

      <OptionSelector
        title="Kadar Gula"
        values={[0, 25, 50, 75, 100]}
        value={options.sugar}
        onChange={(v) => update("sugar", v)}
      />

      <OptionSelector
        title="Takaran Es"
        values={["Sedikit", "Normal", "Banyak"]}
        value={options.ice}
        onChange={(v) => update("ice", v)}
      />

      <OptionSelector
        title="Pilihan Susu"
        values={["Susu Sapi", "Oat Milk", "Almond Milk"]}
        value={options.milk}
        onChange={(v) => update("milk", v)}
      />

      <div className="option-group">
        <h4>Topping Tambahan</h4>

        {TOPPINGS.map((topping) => (
          <label className="topping-row" key={topping}>
            <span>
              <input
                type="checkbox"
                checked={options.toppings.includes(topping)}
                onChange={() => toggleTopping(topping)}
              />
              {topping}
            </span>
            <span>+Rp 3.000</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Dessert hanya menggunakan harga dasar.
// Drink menambahkan biaya topping Rp3.000 per topping.
function getUnitPrice(item) {
  if (item.category === "Dessert") {
    return item.price;
  }

  return item.price +
    (item.options?.toppings?.length || 0) * 3000;
}

function ScanQRPage({ setTable }) {
  const navigate = useNavigate();

  function startOrder() {
    setTable("12");
    navigate("/home");
  }

  return (
    <div className="scan-page">
      <div className="scan-shade">
        <div className="scan-brand">
          <Leaf size={37} />
          <span>
            Matcha<br />House
          </span>
        </div>

        <div className="scan-center">
          <div className="scan-frame">
            <div className="scan-paper">
              <Leaf size={34} color={GREEN} />
              <strong>Matcha House</strong>
              <QrCode size={124} strokeWidth={1.3} />
              <span>Scan to Order</span>
            </div>
          </div>
        </div>

        <button className="scan-action" onClick={startOrder}>
          <ScanLine size={26} />
          <span>
            <strong>Mulai Pesan</strong>
            <small>Simulasi scan QR meja 12</small>
          </span>
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}

function HomePage({ cartCount, table, menuProducts }) {
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const categories = ["Semua", "Drink", "Dessert"];

  const filtered = menuProducts.filter((product) => {
    const categoryMatch =
      category === "Semua" || product.category === category;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="app-page">
      <main className="page-content">
        <header className="home-header">
          <div>
            <h2>Halo, Matcha Lover! 👋</h2>
            <p>Selamat menikmati matcha hari ini!</p>
          </div>

          <button className="round-icon" aria-label="Notifikasi">
            <Bell size={20} />
          </button>
        </header>

        <div className="promo-banner">
          <div className="promo-copy">
            <span>Special Today!</span>
            <h1>
              Buy 1 Get 1<br />Matcha Latte
            </h1>

            <Link to="/product/1" className="promo-button">
              Pesan Sekarang <ArrowRight size={15} />
            </Link>
          </div>

          <ProductImage
            src="/images/matcha-latte.png"
            name="Matcha Latte"
            className="promo-image"
          />
        </div>

        <div className="search-box">
          <Search size={19} />
          <input
            placeholder="Cari menu favorit..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-pill ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="section-heading">
          <h3>Menu Pilihan</h3>
          <span>Meja {table}</span>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <Link
              className="product-card"
              key={product.id}
              to={`/product/${product.id}`}
            >
              <ProductImage
                src={product.image}
                name={product.name}
                className="product-card-image"
              />

              <div className="product-card-body">
                <h4>{product.name}</h4>

                <div className="product-price">
                  <strong>{formatRupiah(product.price)}</strong>
                  <span className="product-plus">
                    <Plus size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-text">Menu tidak ditemukan.</p>
        )}
      </main>

      <BottomNav count={cartCount} />
    </div>
  );
}

function DetailPage({ addToCart, menuProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = menuProducts.find(
    (p) => p.id === Number(id)
  );

  const [options, setOptions] = useState({
    ...defaultOptions,
    toppings: [],
  });

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="simple-message">
        Produk tidak ditemukan.
      </div>
    );
  }

  function handleAdd() {
    const isDessert = product.category === "Dessert";

    const finalOptions = isDessert
      ? {
          ...defaultOptions,
          toppings: [],
        }
      : {
          ...options,
          toppings: [...options.toppings],
        };

    addToCart({
      ...product,
      cartId: `${Date.now()}-${Math.random()}`,
      quantity,
      options: finalOptions,
    });

    navigate("/cart");
  }

  return (
    <div className="app-page detail-page">
      <div className="detail-hero">
        <ProductImage
          src={product.image}
          name={product.name}
          className="detail-hero-image"
        />

        <div className="detail-top-actions">
          <BackButton />

          <button
            className={`hero-heart ${liked ? "liked" : ""}`}
            onClick={() => setLiked(!liked)}
            aria-label="Favorit"
          >
            <Heart
              size={25}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <main className="detail-content">
        <h1>{product.name}</h1>
        <h2>{formatRupiah(product.price)}</h2>

        <p className="detail-description">
          {product.description}
        </p>

        {/* Konfigurasi HANYA untuk Drink */}
        {product.category === "Drink" && (
          <CustomizeForm
            options={options}
            setOptions={setOptions}
          />
        )}

        <div className="detail-actions">
          <div className="quantity-control">
            <button
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              <Minus size={16} />
            </button>

            <strong>{quantity}</strong>

            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </button>
          </div>

          <button
            className="primary-button"
            onClick={handleAdd}
          >
            Tambah ke Keranjang <ArrowRight size={17} />
          </button>
        </div>
      </main>
    </div>
  );
}

function EditOrderModal({ item, onClose, onSave }) {
  const [options, setOptions] = useState({
    ...item.options,
    toppings: [...(item.options?.toppings || [])],
  });

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>Edit Pesanan</h2>

          <button onClick={onClose} aria-label="Tutup">
            <X size={21} />
          </button>
        </header>

        <div className="modal-product">
          <ProductImage
            src={item.image}
            name={item.name}
            className="modal-product-image"
          />

          <div>
            <strong>{item.name}</strong>
            <p>{formatRupiah(item.price)}</p>
          </div>
        </div>

        {/* Modal edit hanya menampilkan pilihan Drink */}
        {item.category === "Drink" && (
          <CustomizeForm
            options={options}
            setOptions={setOptions}
          />
        )}

        <div className="modal-actions">
          <button
            className="outline-button"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className="primary-button"
            onClick={() => onSave(item.cartId, options)}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPage({ cart, setCart }) {
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + getUnitPrice(item) * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.1);

  function updateQuantity(cartId, difference) {
    setCart((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + difference
              ),
            }
          : item
      )
    );
  }

  function removeItem(cartId) {
    setCart((current) =>
      current.filter((item) => item.cartId !== cartId)
    );
  }

  function saveEdit(cartId, options) {
    setCart((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? { ...item, options }
          : item
      )
    );

    setEditing(null);
  }

  return (
    <div className="app-page">
      <header className="page-header">
        <BackButton />
        <h1>Keranjang</h1>

        <button
          className="header-icon"
          onClick={() => setCart([])}
          aria-label="Kosongkan keranjang"
        >
          <Trash2 size={20} />
        </button>
      </header>

      <main className="page-content cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={55} color={GREEN} />
            <h3>Keranjang masih kosong</h3>
            <p>Yuk, pilih matcha favoritmu!</p>

            <button
              className="primary-button"
              onClick={() => navigate("/home")}
            >
              Lihat Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.cartId}
                >
                  <ProductImage
                    src={item.image}
                    name={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <strong>
                      {formatRupiah(getUnitPrice(item))}
                    </strong>

                    {/* Konfigurasi hanya untuk Drink */}
                    {item.category === "Drink" ? (
                      <>
                        <p>
                          Gula: {item.options.sugar}%
                          {" • "}
                          Es: {item.options.ice}
                        </p>

                        <p>
                          Susu: {item.options.milk}
                        </p>

                        {(item.options?.toppings?.length || 0) > 0 && (
                          <p>
                            + {item.options.toppings.join(", ")}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>Dessert • Tanpa konfigurasi</p>
                    )}

                    {/* Rincian harga */}
                    <div className="cart-price-breakdown">
                      <div>
                        <span>Harga dasar</span>
                        <span>
                          {formatRupiah(item.price)}
                        </span>
                      </div>

                      {item.category === "Drink" &&
                        (item.options?.toppings || []).map(
                          (topping, index) => (
                            <div
                              key={`${topping}-${index}`}
                            >
                              <span>+ {topping}</span>
                              <span>
                                {formatRupiah(3000)}
                              </span>
                            </div>
                          )
                        )}

                      <div className="cart-price-unit">
                        <strong>Harga per produk</strong>
                        <strong>
                          {formatRupiah(getUnitPrice(item))}
                        </strong>
                      </div>

                      {item.quantity > 1 && (
                        <div>
                          <strong>
                            Jumlah: {item.quantity} produk
                          </strong>
                          <strong>
                            {formatRupiah(
                              getUnitPrice(item) *
                                item.quantity
                            )}
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, -1)
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, 1)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        className="delete-button"
                        onClick={() =>
                          removeItem(item.cartId)
                        }
                        aria-label="Hapus produk"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Dessert tidak mempunyai tombol Edit */}
                  {item.category === "Drink" && (
                    <button
                      className="edit-button"
                      onClick={() => setEditing(item)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="order-summary">
              <div>
                <span>Subtotal</span>
                <strong>
                  {formatRupiah(subtotal)}
                </strong>
              </div>

              <div>
                <span>Pajak (10%)</span>
                <strong>
                  {formatRupiah(tax)}
                </strong>
              </div>

              <div className="summary-total">
                <strong>Total</strong>
                <strong>
                  {formatRupiah(subtotal + tax)}
                </strong>
              </div>

              <button
                className="primary-button full-button"
                onClick={() => navigate("/checkout")}
              >
                Checkout <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav
        count={cart.reduce(
          (n, item) => n + item.quantity,
          0
        )}
      />

      {editing && (
        <EditOrderModal
          item={editing}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      )}
    </div>
  );
}

function CheckoutPage({ cart, table, placeOrder }) {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("QRIS");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + getUnitPrice(item) * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const payments = [
    {
      name: "QRIS",
      info: "Pembayaran melalui QRIS",
      Icon: QrCode,
    },
    {
      name: "E-Wallet",
      info: "OVO, GoPay, DANA",
      Icon: Wallet,
    },
    {
      name: "Tunai",
      info: "Pembayaran di kasir",
      Icon: Banknote,
    },
  ];

  async function handleCheckout() {
    if (!cart.length || submitting) return;

    setSubmitting(true);

    try {
      await placeOrder(payment, total);
      navigate("/success");
    } catch (error) {
      console.error("Checkout gagal:", error);

      const message =
        error.response?.data?.message ||
        "Gagal menghubungi server. Pastikan backend berjalan.";

      alert(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-page">
      <header className="page-header">
        <BackButton to="/cart" />
        <h1>Checkout</h1>
        <span />
      </header>

      <main className="page-content checkout-page">
        <h3>Informasi Pesanan</h3>

        <div className="table-card">
          <HomeIcon size={23} />

          <div>
            <strong>Meja {table}</strong>
            <small>Restoran Matcha House</small>
          </div>

          <span>Dine In</span>
        </div>

        <h3>Metode Pembayaran</h3>

        <div className="payment-methods">
          {payments.map(({ name, info, Icon }) => (
            <button
              key={name}
              onClick={() => setPayment(name)}
              className={`payment-row ${
                payment === name ? "chosen" : ""
              }`}
            >
              <span
                className={`radio-dot ${
                  payment === name ? "checked" : ""
                }`}
              >
                {payment === name && (
                  <Check size={12} />
                )}
              </span>

              <Icon size={25} />

              <span className="payment-label">
                <strong>{name}</strong>
                <small>{info}</small>
              </span>
            </button>
          ))}
        </div>

        <h3>Ringkasan Pesanan</h3>

        <div className="checkout-items">
          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.cartId}
            >
              <ProductImage
                src={item.image}
                name={item.name}
                className="checkout-image"
              />

              <span>
                {item.name} ×{item.quantity}
              </span>

              <strong>
                {formatRupiah(
                  getUnitPrice(item) * item.quantity
                )}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-summary checkout-summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatRupiah(subtotal)}</strong>
          </div>

          <div>
            <span>Pajak (10%)</span>
            <strong>{formatRupiah(tax)}</strong>
          </div>

          <div className="summary-total">
            <strong>Total</strong>
            <strong>{formatRupiah(total)}</strong>
          </div>
        </div>

        <p className="demo-note">
          Mode demo: pesanan disimpan ke sistem.
          Pembayaran belum dilakukan secara nyata
          dan masih memerlukan konfirmasi.
        </p>

        <button
          disabled={!cart.length || submitting}
          className="primary-button full-button"
          onClick={handleCheckout}
        >
          {submitting
            ? "Menyimpan Pesanan..."
            : "Konfirmasi Pesanan (Demo)"}
          <ChevronRight size={19} />
        </button>
      </main>
    </div>
  );
}

function SuccessPage({ order }) {
  const navigate = useNavigate();

  return (
    <div className="app-page success-page">
      <div className="success-confetti">
        ✦ ・ ✧ ・ ✦
      </div>

      <div className="success-check">
        <Check size={64} strokeWidth={3} />
      </div>

      <h1>Pesanan Tercatat!</h1>

      <p>
        Pesanan kamu berhasil dicatat.
        <br />
        Status: {order?.status || "Menunggu Pembayaran"}
        <br />
        Terima kasih telah memesan di Matcha House 💚
      </p>

      <div className="order-number-box">
        <span>Nomor Pesanan</span>

        <div>
          <strong>
            #{order?.id || "MH-DEMO"}
          </strong>

          <button
            onClick={() =>
              navigator.clipboard?.writeText(
                order?.id || "MH-DEMO"
              )
            }
            aria-label="Salin nomor pesanan"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      <button
        className="primary-button full-button"
        onClick={() => navigate("/history")}
      >
        Lihat Pesanan
      </button>

      <button
        className="outline-button full-button"
        onClick={() => navigate("/home")}
      >
        Kembali ke Menu
      </button>

      <ProductImage
        src="/images/matcha-latte.png"
        name="Matcha Latte"
        className="success-image"
      />
    </div>
  );
}

function HistoryPage({ orders, cartCount }) {
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState(null);

  const filters = [
    "Semua",
    "Menunggu Pembayaran",
    "Selesai",
    "Diproses",
    "Dibatalkan",
  ];

  const visibleOrders = orders.filter(
    (order) =>
      filter === "Semua" ||
      order.status === filter
  );

  return (
    <div className="app-page">
      <header className="page-header">
        <BackButton />
        <h1>Riwayat Pesanan</h1>
        <span />
      </header>

      <main className="page-content">
        <div className="category-list history-filters">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`category-pill ${
                filter === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {visibleOrders.length === 0 && (
          <div className="empty-cart">
            <Clock3 size={52} color={GREEN} />
            <h3>Belum ada pesanan</h3>
            <p>
              Riwayat pesananmu akan muncul di sini.
            </p>
          </div>
        )}

        <div className="history-list">
          {visibleOrders.map((order) => (
            <article
              className="history-card"
              key={order.id}
            >
              <ProductImage
                src={order.items[0]?.image}
                name="Produk"
                className="history-image"
              />

              <div className="history-info">
                <div className="history-title">
                  <strong>#{order.id}</strong>

                  <span
                    className={`status ${
                      order.status.toLowerCase()
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <small>
                  {new Date(order.date).toLocaleString(
                    "id-ID"
                  )}
                </small>

                <p>
                  {order.items
                    .map((item) => item.name)
                    .join(", ")}
                </p>

                <div className="history-price">
                  <span>Total</span>
                  <strong>
                    {formatRupiah(order.total)}
                  </strong>
                </div>

                <button
                  className="detail-link"
                  onClick={() => setSelected(order)}
                >
                  Lihat Detail <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <BottomNav count={cartCount} />

      {selected && (
        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="edit-modal order-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="modal-header">
              <h2>Detail Pesanan</h2>

              <button
                onClick={() => setSelected(null)}
              >
                <X size={21} />
              </button>
            </header>

            <p>
              <strong>Nomor:</strong> #{selected.id}
            </p>

            <p>
              <strong>Status:</strong> {selected.status}
            </p>

            <p>
              <strong>Meja:</strong> {selected.table}
            </p>

            <p>
              <strong>Metode:</strong> {selected.payment}
            </p>

            <hr />

            {selected.items.map((item) => (
              <div
                className="detail-order-row"
                key={item.cartId}
              >
                <span>
                  {item.quantity}× {item.name}
                </span>

                <strong>
                  {formatRupiah(
                    getUnitPrice(item) * item.quantity
                  )}
                </strong>
              </div>
            ))}

            <hr />

            <div className="detail-order-row">
              <strong>Total</strong>
              <strong>
                {formatRupiah(selected.total)}
              </strong>
            </div>

            <button
              className="primary-button full-button"
              onClick={() => setSelected(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const [cart, setCart] = useState(() =>
    readStorage("mh-cart", [])
  );

  const [orders, setOrders] = useState(() =>
    readStorage("mh-orders", [])
  );

  const [table, setTable] = useState(
    () => localStorage.getItem("mh-table") || "12"
  );

  const [lastOrder, setLastOrder] = useState(null);
  const [menuProducts, setMenuProducts] = useState(products);

  // Ambil daftar menu dari backend
  useEffect(() => {
    async function loadMenus() {
      try {
        const menus = await menuService.getAll();
        setMenuProducts(menus);
      } catch (error) {
        console.error(
          "Gagal mengambil menu API:",
          error
        );
      }
    }

    loadMenus();
  }, []);

  // Simpan keranjang secara lokal
  useEffect(() => {
    localStorage.setItem(
      "mh-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Simpan riwayat secara lokal
  useEffect(() => {
    localStorage.setItem(
      "mh-orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // Sinkronisasi status riwayat dengan backend
  useEffect(() => {
    async function syncOrderStatuses() {
      const savedOrders = readStorage(
        "mh-orders",
        []
      );

      if (savedOrders.length === 0) return;

      const updatedOrders = await Promise.all(
        savedOrders.map(async (order) => {
          try {
            const latestOrder =
              await orderService.getById(order.id);

            const statusMap = {
              menunggu_pembayaran: "Menunggu Pembayaran",
              diproses: "Diproses",
              selesai: "Selesai",
              dibatalkan: "Dibatalkan",
            };

            return {
              ...order,
              status:
                statusMap[latestOrder.status] ||
                order.status,
            };
          } catch (error) {
            console.error(
              `Gagal memperbarui status pesanan ${order.id}:`,
              error
            );

            return order;
          }
        })
      );

      setOrders((current) =>
        current.map(
          (order) =>
            updatedOrders.find(
              (item) => item.id === order.id
            ) || order
        )
      );
    }

    syncOrderStatuses();
  }, []);

  useEffect(() => {
    localStorage.setItem("mh-table", table);
  }, [table]);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function addToCart(item) {
    setCart((current) => [...current, item]);
  }

  // Simpan pesanan melalui API Express + SQLite
  async function placeOrder(payment, total) {
    const payload = {
      table,
      orderType: "dine_in",
      paymentMethod: payment,

      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,

        options: {
          sugar: item.options?.sugar ?? 50,
          ice: item.options?.ice ?? "Normal",
          milk: item.options?.milk ?? "Susu Sapi",

          // Dessert tidak memiliki topping
          toppings:
            item.category === "Dessert"
              ? []
              : item.options?.toppings || [],
        },
      })),
    };

    const savedOrder =
      await orderService.create(payload);

    const statusMap = {
      menunggu_pembayaran: "Menunggu Pembayaran",
      diproses: "Diproses",
      selesai: "Selesai",
      dibatalkan: "Dibatalkan",
    };

    const orderForUI = {
      id: savedOrder.id,
      items: [...cart],
      total: savedOrder.total ?? total,
      payment,
      table,
      status:
        statusMap[savedOrder.status] ||
        "Menunggu Pembayaran",
      date: new Date().toISOString(),
    };

    setOrders((current) => [
      orderForUI,
      ...current,
    ]);

    setLastOrder(orderForUI);
    setCart([]);

    return savedOrder;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<ScanQRPage setTable={setTable} />}
      />

      <Route
        path="/home"
        element={
          <HomePage
            cartCount={cartCount}
            table={table}
            menuProducts={menuProducts}
          />
        }
      />

      <Route
        path="/product/:id"
        element={
          <DetailPage
            addToCart={addToCart}
            menuProducts={menuProducts}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            setCart={setCart}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cart={cart}
            table={table}
            placeOrder={placeOrder}
          />
        }
      />

      <Route
        path="/success"
        element={
          <SuccessPage
            order={lastOrder || orders[0]}
          />
        }
      />

      <Route
        path="/history"
        element={
          <HistoryPage
            orders={orders}
            cartCount={cartCount}
          />
        }
      />

      <Route
        path="*"
        element={
          <div className="simple-message">
            <Link to="/home">
              Kembali ke Home
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
