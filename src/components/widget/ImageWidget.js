import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

export default class ImageWidget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired
  };

  renderPreview = () => {

  };

  render() {
    const {widget, onlyPreview} = this.props;

    return (
      <div>
        {!onlyPreview &&
        <Row>
          <Col>
            IMAGE EDIT AREA
          </Col>
        </Row>
        }
        <Row>
          <Col>
            PREVIEW AREA
          </Col>
        </Row>
      </div>
    );
  }
}