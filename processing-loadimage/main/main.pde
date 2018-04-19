
byte [] data = loadBytes("data/cat.npy");
println(data.length);


int total = 1000;
int grid = 784;

byte []outdata = new byte [total*grid];
int outindex =0;

for(int n = 0; n < total; n++){
  int start = 80 + n * grid;
  //PImage img = createImage(28,28,RGB);
  //img.loadPixels();
  for (int i = 0; i < grid; i++){
    int index = i+ start;
    byte val = data[index];
    outdata[outindex] = val;
    outindex ++;
   // img.pixels[i] = color(255-val & 0xff);
  }
  
  //img.updatePixels();
  //int x = 28* (n % 10);
  //int y = 28* (n/10);
  //image(img,x,y);
}

saveBytes("cats1000.bin",outdata);
