import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleId?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleId,
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <Tag id={titleId} className="text-heading text-balance max-w-4xl">
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-body text-muted-foreground text-pretty max-w-xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
