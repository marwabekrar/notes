import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {

  return (
    <div>
    <NoteListHeader/>
    
    {props.notes.length === 0 ? <NoteListEmptyItem/> :undefined}
    {
      props.notes.map((note) => {
      return <NoteListItem key={note._id} note={note} />
    })
    }
    
    
    Note List {props.notes.length}
    </div>
  );
}



export default createContainer(() => {
  Meteor.subscribe('notes');
  return {
  notes: Notes.find().fetch()
  };
}, NoteList);

NoteList.protoTypes = {
  notes: PropTypes.array.isRequired
};



