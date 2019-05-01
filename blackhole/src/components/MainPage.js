import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from '../actions';
// import { PlusCircle } from "react-feather";

class MainPage extends React.Component {


  componentDidMount() {
    this.props.getData();
  }
 
  toNotes = (e, note) => {
    e.preventDefault();
    console.log(`${note.id}`);
    this.props.history.push(`/notes/${note.id}`);
  };


  toForm = e => {
    e.preventDefault();
    this.props.history.push("/main-page/note-form");
  };

 

  render() {
    return (
      <div className="main">
        <h1> Satellite Storage </h1>
        <button onClick={this.toForm}> Create Note</button>
        {/* {this.props.notes.length === 0 ? (
          <h1> Nothing Stored In Satellite!!</h1>
        ) : ( */}

          {this.props.fetchingNotes || this.props.updatingNotes ? (<h1>Loading...</h1>) : (
          <div className="notes">
            {this.props.notes.map(note => {
              return (
                <div
                  onClick={e => this.toNotes(e, note)}
                  key={note.id}
                  className="note"
                >
                  {note.message}
                </div>
              );
            })}
          </div>
        )}
        {/* <PlusCircle onClick={this.toForm} color="white"></PlusCircle> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  fetchingNotes: state.fetchingNotes,
  updatingNotes: state.updatingNotes
});

export default withRouter(
  connect(
    mapStateToProps,
    { getData }
  )(MainPage)
);


