export function InnovateSection({ 
  title = "Let's Innovate!",
  description = "Tell us your vision to receive a custom growth plan.",
  buttonText = "Contact us",
  onButtonClick,
  contactPath = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  contactPath?: string;
}) {

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.location.href = contactPath;
    }
  };

  return (
    <div className="bg-black px-6 py-10">
      <div className="max-w-screen-xl mx-auto rounded-2xl border border-red-900 bg-[#1a0800] px-6 py-16 flex flex-col items-center text-center">
        
        <h2 className="text-white text-3xl sm:text-4xl font-bold">
          {title}
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-xl">
          {description}
        </p>

        <button
          onClick={handleClick}
          className="mt-4 px-10 py-4 rounded-full border border-white text-white text-sm sm:text-base hover:bg-white hover:text-[#1a0800] transition-colors duration-300"
        >
          {buttonText}
        </button>

      </div>
    </div>
  );
}