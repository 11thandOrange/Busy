import { EmptyState, LegacyCard } from "@shopify/polaris";
import "./style.css";
export default function DynamicEmptyState({
  heading,
  actionContent,
  actionCallback,
  secondaryActionContent,
  secondaryActionUrl,
  image,
  description,
}) {
  return (
    <LegacyCard sectioned >
      <EmptyState
        heading={heading}
        action={
          actionContent && actionCallback
            ? { content: actionContent, onAction: actionCallback }
            : undefined
        }
        secondaryAction={
          secondaryActionContent && secondaryActionUrl
            ? { content: secondaryActionContent, url: secondaryActionUrl }
            : undefined
        }
        image={image}
      >
        {description && (
          <p className="empty-state-description">{description}</p>
        )}
      </EmptyState>
    </LegacyCard>
  );
}
