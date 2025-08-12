import { cn } from "../../lib/utils";
import { IconName } from "../../types";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { motion } from "motion/react";

interface Props {
  message: string;
  placement?: "top" | "bottom";
  icon?: IconName;
  actionButton?: {
    label: string;
    icon?: IconName;
    onClick: () => void;
  };
}

export function ActionTip({
  icon,
  message,
  placement = "top",
  actionButton,
}: Props) {
  const animationVariants = {
    top: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    bottom: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  };

  return (
    <motion.div
      initial={animationVariants[placement].initial}
      animate={animationVariants[placement].animate}
      exit={animationVariants[placement].exit}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn([
        "bg-background dark:bg-card absolute left-1/2 -translate-x-1/2 z-2 border px-4 py-2 rounded-md shadow-md dark:shadow-none",
        placement === "top" ? "bottom-6 sm:top-4 sm:bottom-auto " : "bottom-18",
      ])}
    >
      <div className="flex items-center gap-2">
        {icon && <PhosphorIcon icon={icon} />}
        <p className="text-sm text-muted-foreground">{message}</p>
        {actionButton && (
          <>
            <div className="mx-2 h-6 w-px bg-border self-center" />
            <CustomButton onClick={actionButton.onClick} size="sm">
              {actionButton.label}
              {actionButton.icon && <PhosphorIcon icon={actionButton.icon} />}
            </CustomButton>
          </>
        )}
      </div>
    </motion.div>
  );
}
