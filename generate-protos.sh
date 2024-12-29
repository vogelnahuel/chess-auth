#!/bin/bash

PROTO_DIR="./src/Protos" # Ruta donde están tus archivos .proto
OUT_DIR="./src/Protos/generated" # Carpeta de salida

# Crear la carpeta de salida si no existe
mkdir -p $OUT_DIR

# Ruta al binario de protoc-gen-ts
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Ejecutar grpc-tools para generar los archivos
npx grpc-tools \
  --js_out=import_style=commonjs,binary:$OUT_DIR \
  --grpc_out=grpc_js:$OUT_DIR \
  --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
  --ts_out=grpc_js:$OUT_DIR \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto
