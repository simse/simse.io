cd model
python3 train_model.py
cd ..

rm -rf ./static/model
mkdir ./static/model
cp -R ./model/model_for_js/* ./static/model

yarn build --prefix-paths