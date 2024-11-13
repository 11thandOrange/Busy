import {Banner} from '@shopify/polaris';
import React from 'react';

/**
 * MultiButtonBanner component renders a banner with customizable actions and content.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title of the banner.
 * @param {'success' | 'info' | 'warning' | 'critical'} [props.tone='critical'] - The tone of the banner, which defines its color and icon.
 * @param {{ content: string, onAction: () => void }} [props.action] - The primary action object containing the content and onAction handler.
 * @param {{ content: string, onAction: () => void }} [props.secondaryAction] - The secondary action object containing the content and onAction handler.
 * @param {string} props.content - The main content text of the banner.
 * @param {function} [props.onDismiss] - Function to handle the dismiss action for the banner.
 * @returns {JSX.Element} The rendered Banner component.
 */

const MultiButtonBanner = ({title, tone='critical', action, secondaryAction, content, onDismiss = () => {}}) => {
  return (
    <Banner
      title={title}
      tone={tone}
      action={action}
      secondaryAction={secondaryAction}
      onDismiss={onDismiss}
    >
      <p>
        {content}
      </p>
    </Banner>
  );
}

export default MultiButtonBanner