---
title: The Longing for a Faster and Cleaner Web
image: https://unsplash.com/photos/2aNfAyr14RQ/download?ixid=MnwxMjA3fDB8MXxhbGx8N3x8fHx8fDJ8fDE2NTk4ODI2NDA&force=true
imageCredit: Taken from Unsplash
date: 2022-06-06
published: true
---

## Bruh
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc varius, augue ut lacinia fermentum, libero eros bibendum urna, in fermentum purus nulla nec metus. Maecenas ullamcorper posuere odio, ac tincidunt metus vestibulum quis. Curabitur ultricies vulputate felis lacinia pulvinar. Phasellus aliquam mauris vel mattis rhoncus. Donec non arcu nec purus convallis pharetra. Mauris tortor ligula, blandit vitae nunc faucibus, posuere dapibus velit. Nam ultrices dignissim ligula, vel aliquet nulla. Phasellus vel urna nisi. Aenean sit amet convallis quam. Sed a massa libero.

### Bruh
Etiam sodales dolor sed urna tristique aliquet. Vivamus consectetur convallis risus at dictum. Vestibulum vel molestie augue. Etiam quis consectetur arcu, eu congue nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus a lacus vel pretium. Maecenas dui velit, euismod ut consectetur in, commodo vitae nunc. Mauris malesuada ipsum non arcu rhoncus ullamcorper. Pellentesque nec dapibus mi. Duis dapibus lectus ante, id feugiat tortor tincidunt sit amet. Sed in erat sit amet lectus accumsan auctor id vel lorem. Fusce sagittis tortor vel nibh consequat cursus vel non neque. Mauris consequat a odio a porta. Etiam ut dolor non ligula aliquam ultricies dignissim vel enim.

#### BRUH
Donec molestie scelerisque ligula quis pretium. Nulla a maximus tortor. Quisque eget vestibulum odio. Cras faucibus erat at augue ultricies suscipit. Nam rhoncus mi et pretium viverra. Proin non lorem maximus, bibendum odio vitae, elementum risus. Vivamus cursus sit amet massa et feugiat. Sed viverra consectetur dapibus. Sed dapibus diam nec magna ultrices placerat. Sed vulputate mauris eu arcu vehicula efficitur. Maecenas at viverra urna, et maximus purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vivamus id elementum arcu, et lobortis quam. Duis in quam faucibus nibh porttitor suscipit id non risus.

##### BRUH
Sed vitae fermentum ipsum. Phasellus leo ex, pharetra ac sagittis ut, hendrerit sed magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut lectus eget ligula porta congue eu interdum nisl. Quisque id sapien turpis. Maecenas vel diam non nisi imperdiet sodales sed a purus. Vestibulum fermentum pellentesque volutpat. Aenean aliquet vel risus vitae porttitor. Mauris posuere mi quis neque ornare, quis ultrices justo pretium. Suspendisse eget malesuada nibh. Integer in ligula quis elit volutpat scelerisque eget non justo. Sed sollicitudin, ipsum vel tincidunt iaculis, tellus est egestas mi, sit amet facilisis urna diam vitae nunc. Aenean dapibus lectus id elit eleifend, a posuere ex porta. Proin vitae leo eget quam congue mattis.

###### BRUH YUH
In porta, dolor viverra efficitur molestie, justo enim pharetra ante, cursus accumsan nisl purus sed augue. Pellentesque eu ipsum bibendum, elementum urna ac, condimentum nibh. Nulla sit amet tortor nec eros sollicitudin dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sem ex, laoreet condimentum aliquet eu, dapibus non urna. Etiam suscipit ut felis in condimentum. Sed eget erat turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus consectetur metus vitae orci tristique maximus.

```go
package main

import "fmt"

func main() {
    ch := make(chan float64)
    ch <- 1.0e10    // magic number
    x, ok := <- ch
    defer fmt.Println(`exitting now\`)
    go println(len("hello world!"))
    return
}
```