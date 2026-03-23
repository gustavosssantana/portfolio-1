import React from "react"
import { ArrowDown } from "lucide-react"
import { useAutoScroll } from "@/components/hooks/use-auto-scroll"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const ChatMessageList = React.forwardRef(
  ({ className, children, ...props }, _ref) => {
    const { scrollRef, isAtBottom, scrollToBottom, handleScroll } =
      useAutoScroll([children])

    return (
      <div className={cn("relative w-full h-full", className)} {...props}>
        <div
          className={cn(
            "flex flex-col w-full h-full p-4 overflow-y-auto",
            className
          )}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="flex flex-col gap-6">{children}</div>
        </div>

        {!isAtBottom && (
          <Button
            onClick={scrollToBottom}
            size="icon"
            variant="outline"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-full shadow-md inline-flex items-center justify-center"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }
)
ChatMessageList.displayName = "ChatMessageList"

export { ChatMessageList }
