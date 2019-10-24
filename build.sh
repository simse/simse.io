#/bin/bash
pip install buster
buster generate --domain https://simse.io --dir publish/
find . -name '*.html' -type f -exec sed -i 's/jpgg/jpg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpgpg/jpg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpgjpg/jpg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpegg/jpeg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpegeg/jpeg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpegpeg/jpeg/g' {} +
find . -name '*.html' -type f -exec sed -i 's/jpegjpeg/jpeg/g' {} +
cp _redirects publish/_redirects
