/* eslint-disable indent */
import { Singleton } from "../../../lib/decorators";
import { Layout } from "../../../lib/layout";
import { NITEStyle } from "../../../lib/types";
import { routeToPage } from "../routes";

@Singleton()
export class AnotherPage extends Layout {
  constructor(){
    super();
    this.initializeRoute([() => this.render()]);
  }
  
  private render = () => {
    // Main container
    const page = this.CreateNode("div") as HTMLElement;
    const container = this.CreateNode("div") as HTMLElement;
    const content = this.CreateNode("div") as HTMLElement;
    
    // Apply base styles
    this.Style(page, "fixed top-0 bottom-0 left-0 right-0 w-100 h-screen-full overflow-y-auto");
    this.Style(container, "min-h-screen w-full flex-container flex-col space py-8 px-4");
    this.Style(content, "max-w-4xl mx-auto w-full");
    
    // Background with gradient effect
    this.Vanilla(page, {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      overflowY: "auto"
    });
    
    // Header section
    const header = this.CreateNode("div") as HTMLElement;
    this.Style(header, "text-center mb-12");
    
    const mainTitle = this.CreateNode("h1") as HTMLElement;
    this.Text(mainTitle, "✨ Welcome to Another Page ✨");
    this.Style(mainTitle, "font-bold text-white mb-4");
    this.Vanilla(mainTitle, {
      fontSize: "48px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      marginBottom: "16px"
    });
    
    const subtitle = this.CreateNode("p") as HTMLElement;
    this.Text(subtitle, "Experience seamless routing with enhanced UI components");
    this.Style(subtitle, "text-white opacity-90");
    this.Vanilla(subtitle, {
      fontSize: "20px"
    });
    
    this.SetChild(header, mainTitle);
    this.SetChild(header, subtitle);
    
    // Info card
    const infoCard = this.createInfoCard();
    
    // Feature grid
    const featuresGrid = this.createFeaturesGrid();
    
    // Interactive counter section
    const counterSection = this.createCounterSection();
    
    // Dynamic quote section
    const quoteSection = this.createQuoteSection();
    
    // Action buttons
    const actionButtons = this.createActionButtons();
    
    // Assemble content
    this.SetChild(content, header);
    this.SetChild(content, infoCard);
    this.SetChild(content, featuresGrid);
    this.SetChild(content, counterSection);
    this.SetChild(content, quoteSection);
    this.SetChild(content, actionButtons);
    
    this.SetChild(container, content);
    this.SetChild(page, container);
    
    // Back button with enhanced styling
    const backButton = this.createEnhancedBackButton();
    this.SetChild(page, backButton);
    
    // Add floating particles effect
    this.addParticleEffect(page);
    
    // Add keyboard navigation
    this.addKeyboardNavigation();
    
    return page;
  };
  
  private createInfoCard = (): HTMLElement => {
    const card = this.CreateNode("div") as HTMLElement;
    this.Style(card, "rounded-2xl p-6 mb-8");
    this.Vanilla(card, {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease"
    });
    
    // Hover effect
    this.HandleEvent(card, "mouseenter", () => {
      this.Vanilla(card, {
        transform: "translateY(-5px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      });
    });
    
    this.HandleEvent(card, "mouseleave", () => {
      this.Vanilla(card, {
        transform: "translateY(0px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
      });
    });
    
    const title = this.CreateNode("h3") as HTMLElement;
    this.Text(title, "📊 Page Information");
    this.Style(title, "font-bold text-white mb-3");
    this.Vanilla(title, { fontSize: "24px" });
    
    const description = this.CreateNode("p") as HTMLElement;
    this.Text(description, "Routing between pages is incredibly easy with our framework. This page demonstrates various UI components and interactive elements.");
    this.Style(description, "text-white opacity-90 mb-4");
    this.Vanilla(description, { 
      lineHeight: "1.5",
      fontSize: "16px"
    });
    
    const metaInfo = this.CreateNode("div") as HTMLElement;
    this.Style(metaInfo, "flex gap-4");
    this.Vanilla(metaInfo, { 
      display: "flex",
      gap: "16px",
      fontSize: "14px"
    });
    
    const pageId = this.CreateNode("span") as HTMLElement;
    this.Text(pageId, "🔖 Page ID: 2");
    this.Style(pageId, "text-white opacity-70");
    
    const routeTime = this.CreateNode("span") as HTMLElement;
    const currentTime = new Date().toLocaleTimeString();
    this.Text(routeTime, `⏱️ Loaded at: ${currentTime}`);
    this.Style(routeTime, "text-white opacity-70");
    
    this.SetChild(metaInfo, pageId);
    this.SetChild(metaInfo, routeTime);
    this.SetChild(card, title);
    this.SetChild(card, description);
    this.SetChild(card, metaInfo);
    
    return card;
  };
  
  private createFeaturesGrid = (): HTMLElement => {
    const grid = this.CreateNode("div") as HTMLElement;
    this.Vanilla(grid, {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "32px"
    });
    
    const features = [
      { emoji: "🚀", title: "Fast Routing", desc: "Lightning fast page transitions" },
      { emoji: "🎨", title: "Vanilla Styling", desc: "Pure CSS with no dependencies" },
      { emoji: "📱", title: "Responsive", desc: "Works on all screen sizes" },
      { emoji: "♿", title: "Accessible", desc: "Keyboard navigation ready" }
    ];
    
    features.forEach(feature => {
      const card = this.CreateNode("div") as HTMLElement;
      this.Style(card, "rounded-xl p-4 text-center");
      this.Vanilla(card, {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(5px)",
        transition: "transform 0.2s ease"
      });
      
      this.HandleEvent(card, "mouseenter", () => {
        this.Vanilla(card, { transform: "scale(1.05)" });
      });
      
      this.HandleEvent(card, "mouseleave", () => {
        this.Vanilla(card, { transform: "scale(1)" });
      });
      
      const emoji = this.CreateNode("div") as HTMLElement;
      this.Text(emoji, feature.emoji);
      this.Vanilla(emoji, { fontSize: "40px", marginBottom: "12px" });
      
      const title = this.CreateNode("h4") as HTMLElement;
      this.Text(title, feature.title);
      this.Style(title, "font-bold text-white mb-2");
      this.Vanilla(title, { fontSize: "18px" });
      
      const desc = this.CreateNode("p") as HTMLElement;
      this.Text(desc, feature.desc);
      this.Style(desc, "text-white opacity-80");
      this.Vanilla(desc, { fontSize: "14px" });
      
      this.SetChild(card, emoji);
      this.SetChild(card, title);
      this.SetChild(card, desc);
      this.SetChild(grid, card);
    });
    
    return grid;
  };
  
  private createCounterSection = (): HTMLElement => {
    const section = this.CreateNode("div") as HTMLElement;
    this.Vanilla(section, {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "32px",
      textAlign: "center"
    });
    
    const title = this.CreateNode("h3") as HTMLElement;
    this.Text(title, "🎯 Interactive Counter");
    this.Style(title, "font-bold text-white mb-4");
    this.Vanilla(title, { fontSize: "20px" });
    
    const [count, setCount, observeCount] = this.Watch<number>(0);
    
    const counterValue = this.CreateNode("div") as HTMLElement;
    this.Text(counterValue, "0");
    this.Style(counterValue, "font-bold text-white mb-4");
    this.Vanilla(counterValue, {
      fontSize: "64px",
      fontWeight: "bold"
    });
    
    const buttonContainer = this.CreateNode("div") as HTMLElement;
    this.Vanilla(buttonContainer, {
      display: "flex",
      gap: "12px",
      justifyContent: "center"
    });
    
    const incrementBtn = this.Button({
      variant: "contained",
      text: "Increment",
      icon: "plus"
    });
    this.Vanilla(incrementBtn, {
      padding: "10px 20px",
      fontSize: "16px"
    });
    
    const decrementBtn = this.Button({
      variant: "contained",
      text: "Decrement",
      icon: "minus"
    });
    this.Vanilla(decrementBtn, {
      padding: "10px 20px",
      fontSize: "16px"
    });
    
    const resetBtn = this.Button({
      variant: "outlined",
      text: "Reset",
      icon: "refresh"
    });
    this.Vanilla(resetBtn, {
      padding: "10px 20px",
      fontSize: "16px"
    });
    
    this.SetChild(buttonContainer, incrementBtn);
    this.SetChild(buttonContainer, decrementBtn);
    this.SetChild(buttonContainer, resetBtn);
    
    this.SetChild(section, title);
    this.SetChild(section, counterValue);
    this.SetChild(section, buttonContainer);
    
    // Counter logic
    this.HandleEvent(incrementBtn, "click", () => {
      setCount(prev => prev + 1);
    });
    
    this.HandleEvent(decrementBtn, "click", () => {
      setCount(prev => Math.max(0, prev - 1));
    });
    
    this.HandleEvent(resetBtn, "click", () => {
      setCount(0);
    });
    
    observeCount(() => {
      this.Text(counterValue, `${count()}`);
      // Add bounce animation
      this.Vanilla(counterValue, {
        transform: "scale(1.1)",
        transition: "transform 0.1s ease"
      });
      setTimeout(() => {
        this.Vanilla(counterValue, {
          transform: "scale(1)"
        });
      }, 100);
    });
    
    return section;
  };
  
  private createQuoteSection = (): HTMLElement => {
    const section = this.CreateNode("div") as HTMLElement;
    this.Vanilla(section, {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "32px",
      textAlign: "center"
    });
    
    const [quoteIndex, setQuoteIndex, observeQuote] = this.Watch<number>(0);
    
    const quotes = [
      { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
    ];
    
    const quoteText = this.CreateNode("p") as HTMLElement;
    this.Text(quoteText, quotes[0].text);
    this.Style(quoteText, "text-white mb-3");
    this.Vanilla(quoteText, {
      fontSize: "18px",
      fontStyle: "italic",
      lineHeight: "1.5"
    });
    
    const quoteAuthor = this.CreateNode("p") as HTMLElement;
    this.Text(quoteAuthor, `- ${quotes[0].author}`);
    this.Style(quoteAuthor, "text-white opacity-70");
    this.Vanilla(quoteAuthor, { fontSize: "14px" });
    
    const nextQuoteBtn = this.Button({
      variant: "outlined",
      text: "Next Quote",
      icon: "arrow-right"
    });
    this.Vanilla(nextQuoteBtn, {
      marginTop: "16px"
    });
    
    this.SetChild(section, quoteText);
    this.SetChild(section, quoteAuthor);
    this.SetChild(section, nextQuoteBtn);
    
    this.HandleEvent(nextQuoteBtn, "click", () => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    });
    
    observeQuote(() => {
      this.Text(quoteText, quotes[quoteIndex()].text);
      this.Text(quoteAuthor, `- ${quotes[quoteIndex()].author}`);
    });
    
    return section;
  };
  
  private createActionButtons = (): HTMLElement => {
    const container = this.CreateNode("div") as HTMLElement;
    this.Vanilla(container, {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "32px"
    });
    
    const reloadBtn = this.Button({
      variant: "outlined",
      text: "Reload Page",
      icon: "refresh"
    });
    
    const alertBtn = this.Button({
      variant: "primary",
      text: "Show Info",
      icon: "info"
    });
    
    const statsBtn = this.Button({
      variant: "contained",
      text: "Show Stats",
      icon: "chart"
    });
    
    this.SetChild(container, reloadBtn);
    this.SetChild(container, alertBtn);
    this.SetChild(container, statsBtn);
    
    this.HandleEvent(reloadBtn, "click", () => {
      window.location.reload();
    });
    
    this.HandleEvent(alertBtn, "click", () => {
      alert("✨ Welcome to Another Page!\nThis page demonstrates vanilla styling and interactive components.");
    });
    
    this.HandleEvent(statsBtn, "click", () => {
      const stats = {
        "Page Loaded": new Date().toLocaleString(),
        "User Agent": navigator.userAgent.split(" ").slice(0, 3).join(" "),
        "Screen Size": `${window.innerWidth}x${window.innerHeight}`
      };
      alert(JSON.stringify(stats, null, 2));
    });
    
    return container;
  };
  
  private createEnhancedBackButton = (): HTMLElement => {
    const backButton = this.Button({
      variant: "contained",
      text: "Back to Home",
      icon: "sign-out"
    });
    
    const style: NITEStyle = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '1000'
    };
    
    this.Vanilla(backButton, style);
    this.Vanilla(backButton, {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "transform 0.2s ease"
    });
    
    this.HandleEvent(backButton, "click", () => {
      routeToPage(0);
    });
    
    this.HandleEvent(backButton, "mouseenter", () => {
      this.Vanilla(backButton, { transform: "scale(1.05)" });
    });
    
    this.HandleEvent(backButton, "mouseleave", () => {
      this.Vanilla(backButton, { transform: "scale(1)" });
    });
    
    return backButton;
  };
  
  private addParticleEffect = (container: HTMLElement): void => {
    const particleContainer = this.CreateNode("div") as HTMLElement;
    this.Vanilla(particleContainer, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "0"
    });
    
    for (let i = 0; i < 50; i++) {
      const particle = this.CreateNode("div") as HTMLElement;
      this.Vanilla(particle, {
        position: "absolute",
        width: Math.random() * 4 + 2 + "px",
        height: Math.random() * 4 + 2 + "px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "50%",
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        animation: `float ${Math.random() * 10 + 5}s linear infinite`
      });
      
      this.SetChild(particleContainer, particle);
    }
    
    // Add keyframe animation to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        from {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        to {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    this.SetChild(container, particleContainer);
  };
  
  private addKeyboardNavigation = (): void => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        routeToPage(0);
      } else if (e.key === 'ArrowLeft') {
        routeToPage(0);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        window.location.reload();
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        alert("📖 Page Info: This is the second page of the app. Press Escape or Arrow Left to go back.");
      }
    });
  };
}