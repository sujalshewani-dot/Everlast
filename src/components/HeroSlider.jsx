import { useEffect, useState } from "react";
import "./HeroSlider.css";

const banners = [
  "/images/hero/banner-1.png",
  "/images/hero/banner-2.png",
];

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % banners.length;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero-slider">
      <div
        className="hero-slider-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div className="hero-slide" key={banner}>
            <img
              src={banner}
              alt={`Everlast Fragrances Banner ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;