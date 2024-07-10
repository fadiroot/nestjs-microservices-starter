#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE paymentdb;
  CREATE DATABASE appointmentdb;
  CREATE DATABASE shopdb;
EOSQL
