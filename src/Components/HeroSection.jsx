import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const slides = [
    {
      image:
        "https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-black-meat-western-food-banner-background-image_194600.jpg",
      title: "Discover Local Delights 🍔",
      text: "Explore the best local restaurants and street food near you.",
      button: "Explore Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1500&q=80",
      title: "Taste the Tradition 🍕",
      text: "From homemade meals to hidden gems — find it all here.",
      button: "Join the Network",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1500&q=80",
      title: "Share Your Food Story 🍜",
      text: "Review, rate, and celebrate your favorite local flavors.",
      button: "Start Sharing",
    },
  ];

  return (
    <div className="relative w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full flex flex-col justify-center items-center text-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                  {slide.text}
                </p>
                <button className="buttonPrimery justify-self-center px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
