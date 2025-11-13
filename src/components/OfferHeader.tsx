import Marquee from "react-fast-marquee";

const OfferHeader = () => (
  <div className="bg-black text-white py-2">
    <Marquee pauseOnHover gradient={false}>
      <span className="px-6">🎉 Big Sale! Flat 30% off on all socks — Free Shipping on orders over $50 🎉</span>
      <span className="px-6">Flat 30% off on all socks — Free Shipping on orders over $50 🎉</span>
    </Marquee>
  </div>
);

export default OfferHeader;
