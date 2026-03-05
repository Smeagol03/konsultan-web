export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, id: string) => {
  e.preventDefault();
  const targetId = id.startsWith("#") ? id.slice(1) : id;
  const element = document.getElementById(targetId.toLowerCase());
  
  if (element) {
    const offset = 80; // Height of the fixed navbar
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
