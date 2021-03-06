import 'focus-visible';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import chevronDown from '@jetbrains/icons/chevron-10px.svg';

import Icon, {Size} from '../icon/icon';
import Theme, {withTheme} from '../global/theme';
import ClickableLink from '../link/clickableLink';

import styles from './button.css';

/**
 * @name Button
 */
class Button extends PureComponent {
  static propTypes = {
    theme: PropTypes.string,
    active: PropTypes.bool,
    danger: PropTypes.bool,
    delayed: PropTypes.bool,
    loader: PropTypes.bool,
    primary: PropTypes.bool,
    blue(props, propName) {
      if (propName in props) {
        return new Error(`"${propName}" prop is deprecated. Use "primary" instead`);
      }
      return undefined;
    },
    short: PropTypes.bool,
    text: PropTypes.bool,
    inline: PropTypes.bool,
    dropdown: PropTypes.bool,

    href: PropTypes.string,
    target: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    iconSize: PropTypes.number,
    iconClassName: PropTypes.string,
    iconSuppressSizeWarning: PropTypes.bool,

    className: PropTypes.string,

    children: PropTypes.node
  };

  static IconSize = Size;
  static Theme = Theme;

  render() {
    const {
      // Modifiers
      theme,
      active,
      blue,
      danger,
      delayed,
      loader,
      primary,
      short,
      text,
      inline,
      dropdown,

      // Props
      icon,
      iconSize,
      iconClassName,
      iconSuppressSizeWarning,
      className,
      children,
      ...props
    } = this.props;

    const withNormalIcon = icon && !active && !danger && !primary && !props.disabled;
    const classes = classNames(
      styles.button,
      className,
      styles[theme],
      {
        [styles.active]: active,
        [styles.danger]: danger,
        [styles.delayed]: delayed,
        [styles.withIcon]: icon,
        [styles.onlyIcon]: icon && !children,
        [styles.withNormalIconLight]: (
          withNormalIcon && theme === Theme.LIGHT
        ),
        [styles.withNormalIconDark]: (
          withNormalIcon && theme === Theme.DARK
        ),
        [styles.withDangerIconLight]: (
          icon && danger && theme === Theme.LIGHT
        ),
        [styles.withDangerIconDark]: (
          icon && danger && theme === Theme.DARK
        ),
        [styles.loader]: loader && !icon,
        [styles.primary]: primary || blue,
        [styles.short]: short,
        [styles.text]: text,
        [styles.inline]: inline
      }
    );

    const content = (
      <span className={styles.content}>
        {icon && (
          <span className={classNames(styles.icon, iconClassName)}>
            <Icon
              glyph={icon}
              size={iconSize}
              loading={loader}
              suppressSizeWarning={iconSuppressSizeWarning}
            />
          </span>
        )}
        {children && (
          <span>{children}</span>
        )}
        {dropdown && (
          <Icon
            glyph={chevronDown}
            className={styles.dropdownIcon}
          />
        )}
      </span>
    );
    const isLink = !!props.href;

    const Tag = isLink ? ClickableLink : 'button';
    return (
      <Tag
        tabIndex={loader ? -1 : 0}
        type={isLink ? null : 'button'}
        {...props}
        className={classes}
      >
        {loader && !text && !icon && <div className={styles.loaderBackground}/>}
        {content}
      </Tag>
    );
  }
}

export {Size as IconSize};

export default withTheme()(Button);
