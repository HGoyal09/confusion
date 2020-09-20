import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



function RenderDish({ dish }) {
  return(
      <div className="col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>)
}

function RenderComments({ comments }) {
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
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
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
      </div>
  )
}

function DishDetail(props) {
  console.log("DishDetail component render invoked");

  if (props.dish != null) {
    return (
        <div className="container">
          <div className="row">
              <RenderDish dish={props.dish}/>
              <RenderComments comments={props.dish.comments}/>
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