import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  Row,
  Col,
  ListGroupItem,
  Input
} from 'reactstrap';
import HeadingWidget from './HeadingWidget';
import ParagraphWidget from './ParagraphWidget';
import ListWidget from './ListWidget';
import LinkWidget from './LinkWidget';
import ImageWidget from './ImageWidget';
import theme from './css/widget.css';

export default class Widget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired,
    moveWidgetUp: PropTypes.func.isRequired,
    moveWidgetDown: PropTypes.func.isRequired,
  };

  handleDelete = () => {
    const {widget, deleteWidget} = this.props;
    deleteWidget(widget.id);
  };

  handleWidgetTypeChange = event => {
    const {widget, updateWidget} = this.props;

    const newWidget = {...widget, type: event.target.value};
    updateWidget(newWidget);
  };

  handleMoveUp = () => {
    const {widget, moveWidgetUp} = this.props;
    moveWidgetUp(widget.id);
  };

  handleMoveDown = () => {
    const {widget, moveWidgetDown} = this.props;
    moveWidgetDown(widget.id)
  };

  render() {
    const {widget, updateWidget, onlyPreview} = this.props;

    return (
      <ListGroupItem className="mb-4 border-dark">
        {!onlyPreview &&
          <Row>
            <Col>
              <h4>{widget.name}</h4>
            </Col>
            <Col>
              <ButtonToolbar className="pull-right">
                <ButtonGroup>
                  <Button onClick={this.handleMoveUp} color="warning"><i className="fa fa-arrow-up"/></Button>
                  <Button onClick={this.handleMoveDown} color="warning"><i className="fa fa-arrow-down"/></Button>
                </ButtonGroup>
                <Input className="widgetTypeSelect" value={widget.type} type="select" onChange={this.handleWidgetTypeChange}>
                  <option value="HEADING">Heading</option>
                  <option value="PARAGRAPH">Paragraph</option>
                  <option value="LIST">List</option>
                  <option value="LINK">Link</option>
                  <option value="IMAGE">Image</option>
                </Input>
                <ButtonGroup>
                  <Button color="danger" onClick={this.handleDelete}>
                    <i className="fa fa-trash"/>
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
        }
        <div className="p-2">
          {widget.type === 'HEADING' && <HeadingWidget widget={widget} updateWidget={updateWidget} onlyPreview={onlyPreview}/>}
          {widget.type === 'PARAGRAPH' && <ParagraphWidget widget={widget} updateWidget={updateWidget} onlyPreview={onlyPreview}/>}
          {widget.type === 'LIST' && <ListWidget widget={widget} updateWidget={updateWidget} onlyPreview={onlyPreview}/>}
          {widget.type === 'LINK' && <LinkWidget widget={widget} updateWidget={updateWidget} onlyPreview={onlyPreview}/>}
          {widget.type === 'IMAGE' && <ImageWidget widget={widget} updateWidget={updateWidget} onlyPreview={onlyPreview}/>}
        </div>
      </ListGroupItem>
    )
  }
}