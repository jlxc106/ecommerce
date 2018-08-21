import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon, Card } from 'react-materialize';

// let abc;
Card.prototype.render = function() {
  const {
    title,
    header,
    className,
    textClassName,
    actions,
    reveal,
    children,
    horizontal,
    titleUrl,
    ...other
  } = this.props;

  const classes = {
    card: true,
    horizontal: horizontal
  };

  return (
    <div {...other} className={cx(className, classes)}>
      {header}
      {horizontal ? (
        <div className="card-stacked">
          {this.renderAll(title, reveal, textClassName, children, actions)}
        </div>
      ) : (
        this.renderAll(title, reveal, textClassName, children, actions)
      )}
    </div>
  );
};

Card.prototype.renderTitle = function(title, reveal) {
  const { titleUrl } = this.props;
  if (titleUrl) {
    // console.log(titleUrl);
    return (
      <span
        className={cx('card-title', 'grey-text', 'text-darken-4', {
          activator: reveal
        })}
      >
        {titleUrl}
        {reveal && <Icon right>more_vert</Icon>}
      </span>
    );
  } else {
    return (
      <span
        className={cx('card-title', 'grey-text', 'text-darken-4', {
          activator: reveal
        })}
      >
        {title}
        {reveal && <Icon right>more_vert</Icon>}
      </span>
    );
  }
};

export default Card;
