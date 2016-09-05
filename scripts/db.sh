#!/bin/bash

init() {
  PGUSER=$1
  PGDATABASE=$2

  # initialize the user
  createuser $PGUSER -deRS -U postgres

  # create a db
  createdb $PGDATABASE -U $PGUSER
}

init 'beat_sequencer', 'beat_sequencer_development'
