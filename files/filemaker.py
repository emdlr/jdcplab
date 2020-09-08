from random import randint
import math

f = open("data.json","a")
records=1000000
idx=0
r=""
print("Creating File...")
while(idx<records):
    r +='{"'+str(randint(0,1000))+'":"Phrase '+str(randint(0,1000))+'"}\n'
    idx+=1
    if(idx==(math.floor(records*0.25))):
        print("At a 25% ...")
    if(idx==(math.floor(records*0.5))):
        print("At a 50% ...")
    if(idx==(math.floor(records*0.75))):
        print("At a 75% ...")
print("At a 100% ...")
print("Writing File...")
f.write(r)
f.close()

print("File Complete...")

