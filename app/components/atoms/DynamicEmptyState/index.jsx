import { EmptyState, LegacyCard } from "@shopify/polaris";

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
    <LegacyCard sectioned>
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
        {description && <p>{description}</p>}
      </EmptyState>
    </LegacyCard>
  );
}
