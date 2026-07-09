export default function TypingIndicator() {
  return (
    <div className="flex items-start mr-8">
      <div className="rounded-lg bg-muted px-3 py-2">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{animationDelay: '0ms'}} />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{animationDelay: '150ms'}} />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{animationDelay: '300ms'}} />
        </div>
      </div>
    </div>
  );
}
