import json
import os
from os import path

NODETYPES = {
    0 : "empty",
    1 : "base",
    2 : "firewall",
    3 : "broadcast",
    4 : "pirate",
    5 : "receiver",
}

# "firewall" state == 1

randoNames = []
LevelJSONARR = []

def loadLevelFile():
    
    with open('levels.jac') as f:
        numberoflevels = int(f.readline().rstrip('\n'))
        for x in range(0,numberoflevels):
            leveldata = {}
            leveldata["tag"] = f.readline().rstrip('\n')
            playercoord = f.readline().split()
            nodes = []
            playerNode = {}
            for x in range(0,5):
                linearr = f.readline().split()
                for y in range(0,len(linearr)):
                    if(int(linearr[y]) > 0):
                        newnode = {}
                        if(len(linearr[y]) > 1):
                            newnode["team"] = int(linearr[y][1])
                            newnode["nodeType"] = NODETYPES[int(linearr[y][0])]
                        else:
                            newnode["nodeType"] = NODETYPES[int(linearr[y])]
                        if newnode["nodeType"] == "firewall":
                            newnode["state"] = 1
                        else:
                            newnode["state"] = 3
                        newnode["y"] = (x +1) * 100
                        newnode["x"] = (y +1)  * 100
                        
                        newnode["name"] = randoNames[len(nodes)]
                        if x == int(playercoord[0]) -1 and y == int(playercoord[1]) - 1:
                            nodes.insert(0,newnode)
                        else:
                            nodes.append(newnode)
            leveldata["nodes"] = nodes
            leveldata["paths"] = []
            throwaway = f.readline()
            LevelJSONARR.append(leveldata)

def loadNameFile():
    names = []
    with open('rando.names') as data_file:
        for x in data_file:
            randoNames.append(x.rstrip('\n'))

def writeLevlsJS():
    data_file = open('levels.js', 'w+')    
    # levels.push(data)
    data_file.write('var levelarray = [')
    for x in LevelJSONARR:
        data_file.write(json.dumps(x, sort_keys=True,indent=2, separators=(',', ': ')))
        data_file.write(',\n')
    data_file.write('];')


def main():
    loadNameFile()
    loadLevelFile()
    writeLevlsJS()

main()