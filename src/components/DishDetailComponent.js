import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal, ModalHeader, ModalBody, Label, Row, Container
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, "himanshu", values.comment)
  }

  render() {
    return (
        <>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"/> Submit Comment
          </Button>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Container>
                    <Row className="form-group">
                      <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" id="rating" name="rating" className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="name">Name</Label>
                      <Control.text model=".name" id="name" name="name" className="form-control" validators={{
                        minLength: minLength(3), maxLength: maxLength(15)
                      }}/>
                      <Errors className="text-danger" model='.name' show="touched" messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      }}/>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="comment">Comment</Label>
                      <Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control"/>
                    </Row>
                    <Row className="form-group">
                      <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Row>
                  </Container>
                </LocalForm>
              </ModalBody>
          </Modal>
        </>
    )
  }
}

function RenderDish({dish}) {
  return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>)
}

function RenderComments({comments, addComment, dishId}) {
  const feedback = comments.map((comment) => {
    if (comment == null) {
      return <div/>
    } else {
      return (
          <li>
            <div key={comment.id}>
              <div>
                <p>{comment.comment}</p>
              </div>
              <div>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</p>
              </div>
            </div>
          </li>
      )
    }
  });

  return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {feedback}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment}/>
      </div>
  )
}

function DishDetail(props) {
  console.log("DishDetail component render invoked");

  if (props.dish != null) {
    return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr/>
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
          </div>
        </div>
    );
  } else {
    return (
        <div/>
    )
  }
}

export default DishDetail;