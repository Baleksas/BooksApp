import React from "react";

interface FAQItemProps {
  index: number;
  activeIndex: number;
  title: string;
  onChange: (index: number) => void;
  children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({
  index,
  activeIndex,
  title,
  onChange,
  children,
}) => {
  return (
    <div className="collapse my-2 bg-opacity-10 border-2 border-purple-600">
      <input
        onChange={() => onChange(index)}
        checked={activeIndex === index}
        type="radio"
        name="faq-accordion"
      />
      <div
        className={`collapse-title text-xl font-medium ${
          activeIndex === index ? "bg-purple-600" : ""
        }`}
      >
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default FAQItem;
