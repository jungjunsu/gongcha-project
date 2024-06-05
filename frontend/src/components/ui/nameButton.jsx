import React from 'react';
import { cn } from "@/lib/utils";

const ToggleButton = React.forwardRef(
  ({ name, defaultButtonStyle, className, ...props }, ref) => {

    return (
      <button
        ref={ref}
        className={cn(
          defaultButtonStyle,
          className
        )}
        {...props}
      >
        {name}
      </button>
    );
  }
);
ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
