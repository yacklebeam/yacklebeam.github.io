var levelarray = [{
    tag: "opening level, single base",
    nodes: [{
        nodeType: "base",
        name: "me aka jacob",
        state: 0,
        x: 300,
        y: 300,
    }, {
        nodeType: "base",
        name: "cj aka besty",
        state: 3,
        x: 500,
        y: 300,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "bffs",
        state: 0
    }],
},{
    tag: "opening level, double base",
    nodes: [{
        nodeType: "base",
        name: "me aka jacob",
        state: 0,
        x: 400,
        y: 300,
    },{
        nodeType: "base",
        name: "cj aka besty",
        state: 3,
        x: 500,
        y: 300,
    },{
        nodeType: "base",
        name: "cj aka besty",
        state: 3,
        x: 300,
        y: 300,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "bffs",
        state: 0
    },{
        a: 0,
        b: 2,
        name: "bffs",
        state: 0
    }],
},{
    tag: "opening level, travel",
    nodes: [{
        nodeType: "base",
        name: "player",
        state: 0,
        x: 300,
        y: 300,
    },{
        nodeType: "base",
        name: "friend",
        state: 3,
        x: 400,
        y: 300,
    },{
        nodeType: "base",
        name: "friend-of-friend",
        state: 3,
        x: 500,
        y: 300,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "bffs",
        state: 0
    },{
        a: 2,
        b: 1,
        name: "not bffs",
        state: 0
    }],
},{
    tag: "opening level, broadcast",
    nodes: [{
        nodeType: "base",
        name: "player",
        state: 0,
        x: 300,
        y: 300,
    },{
        nodeType: "broadcast",
        name: "broadcaster",
        state: 3,
        x: 400,
        y: 300,
    },{
        nodeType: "base",
        name: "peon1",
        state: 3,
        x: 500,
        y: 300,
    },{
        nodeType: "base",
        name: "peon2",
        state: 3,
        x: 400,
        y: 400,
    },{
        nodeType: "base",
        name: "peon3",
        state: 3,
        x: 400,
        y: 200,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "1",
        state: 0,
    },{
        a: 2,
        b: 1,
        name: "2",
        state: 0,
    },{
        a: 1,
        b: 3,
        name: "3",
        state: 0,
    },{
        a: 1,
        b: 4,
        name: "4",
        state: 0,
    }],
},{
    tag: "opening level, broadcast 2",
    nodes: [{
        nodeType: "base",
        name: "player",
        state: 0,
        x: 300,
        y: 300,
    },{
        nodeType: "broadcast",
        name: "broadcaster",
        state: 3,
        x: 400,
        y: 300,
    },{
        nodeType: "broadcast",
        name: "broadcaster2",
        state: 3,
        x: 500,
        y: 300,
    },{
        nodeType: "base",
        name: "peon2",
        state: 3,
        x: 400,
        y: 400,
    },{
        nodeType: "base",
        name: "peon3",
        state: 3,
        x: 400,
        y: 200,
    },{
        nodeType: "base",
        name: "peon4",
        state: 3,
        x: 500,
        y: 200,
    },{
        nodeType: "base",
        name: "peon5",
        state: 3,
        x: 500,
        y: 400,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "1",
        state: 0,
    },{
        a: 2,
        b: 1,
        name: "2",
        state: 0,
    },{
        a: 1,
        b: 3,
        name: "3",
        state: 0,
    },{
        a: 1,
        b: 4,
        name: "4",
        state: 0,
    },{
        a: 2,
        b: 5,
        name: "5",
        state: 0,
    },{
        a: 2,
        b: 6,
        name: "6",
        state: 0,
    }],
},{
    tag: "opening level, receiver chains",
    nodes: [{
        nodeType: "base",
        name: "player",
        state: 0,
        x: 200,
        y: 300,
    },{
        nodeType: "receiver",
        name: "r1",
        state: 3,
        team: 0,
        x: 300,
        y: 400,
    },{
        nodeType: "base",
        name: "other1",
        state: 3,
        x: 600,
        y: 400,
    },{
        nodeType: "receiver",
        name: "r2",
        state: 3,
        team: 0,
        x: 500,
        y: 400,
    },{
        nodeType: "base",
        name: "other2",
        state: 3,
        x: 600,
        y: 200,
    },{
        nodeType: "receiver",
        name: "r3",
        state: 3,
        team: 1,
        x: 500,
        y: 200,
    },{
        nodeType: "receiver",
        name: "r4",
        state: 3,
        team: 1,
        x: 300,
        y: 200,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "wifi1",
        state: 0,
    },{
        a: 2,
        b: 3,
        name: "wifi2",
        state: 0,
    },{
        a: 0,
        b: 6,
        name: "wifi3",
        state: 0,
    },{
        a: 5,
        b: 4,
        name: "wifi4",
        state: 0,
    }]
},{
    tag: "opening level, receiver chains2",
    nodes: [{
        nodeType: "base",
        name: "player",
        state: 0,
        x: 200,
        y: 300,
    },{
        nodeType: "receiver",
        name: "r1",
        state: 3,
        team: 0,
        x: 300,
        y: 300,
    },{
        nodeType: "base",
        name: "other1",
        state: 3,
        x: 600,
        y: 400,
    },{
        nodeType: "receiver",
        name: "r2",
        state: 3,
        team: 0,
        x: 500,
        y: 400,
    },{
        nodeType: "base",
        name: "other2",
        state: 3,
        x: 600,
        y: 200,
    },{
        nodeType: "receiver",
        name: "r3",
        state: 3,
        team: 0,
        x: 500,
        y: 200,
    }],
    paths: [{
        a: 0,
        b: 1,
        name: "wifi1",
        state: 0,
    },{
        a: 2,
        b: 3,
        name: "wifi2",
        state: 0,
    },{
        a: 5,
        b: 4,
        name: "wifi4",
        state: 0,
    }]
},{
    tag: "opening level- pirates",
    nodes: [{
        nodeType: "base",
        name:"player",
        state:0,
        x:400,
        y:300
    },{
        nodeType: "pirate",
        name:"arghhhh",
        state:3,
        x:500,
        y:300
    },{
        nodeType: "base",
        name:"help",
        state:3,
        x:300,
        y:300
    }],
    paths: [{
        a:0,
        b:1,
        state:0,
        name:"careful"
    },{
        a:0,
        b:2,
        state:0,
        name:"safer"
    }],
},{
    tag: "opening level firewall",
    nodes: [{
        nodeType: "base",
        name:"player",
        state:0,
        x:400,
        y:300
    },{
        nodeType: "firewall",
        name:"no go",
        state:1,
        team: 0,
        x:500,
        y:300
    },{
        nodeType: "base",
        name:"yes go",
        state:3,
        team: 0,
        x:300,
        y:300
    },{
        nodeType: "base",
        name:"yes 1",
        state:3,
        x:500,
        y:400
    },{
        nodeType: "base",
        name:"yes 2",
        state:3,
        x:500,
        y:200
    }],
    paths: [{
        a:0,
        b:1,
        state:0,
        name:"locks pls"
    },{
        a:0,
        b:2,
        state:0,
        name:"get lock here"
    },{
        a:1,
        b:3,
        state:0,
        name:"get lock pls"
    },{
        a:1,
        b:4,
        state:0,
        name:"get lock pls"
    }],
},{
    tag:"opening level final",
    nodes:[{
        nodeType: "base",
        name: "player",
        state:0,
        x:400,
        y:300        
    },{
        nodeType: "broadcast",
        name: "b1",
        state:3,
        x:400,
        y:100        
    },{
        nodeType: "base",
        name: "n1",
        state:3,
        x:200,
        y:200        
    },{
        nodeType: "base",
        name: "n2",
        state:3,
        x:600,
        y:200        
    },{
        nodeType: "base",
        name: "n3",
        state:3,
        x:400,
        y:500        
    },{
        nodeType: "base",
        name: "n4",
        state:3,
        x:200,
        y:400        
    },{
        nodeType: "base",
        name: "n5",
        state:3,
        x:600,
        y:400        
    }],
    paths:[{
        a:0,
        b:1,
        state:0,
        name:"bpath"
    },{
        a:1,
        b:2,
        state:0,
        name:"bpath1"
    },{
        a:1,
        b:3,
        state:0,
        name:"bpath2"
    },{
        a:0,
        b:5,
        state:0,
        name:"bridge1"
    },{
        a:0,
        b:6,
        state:0,
        name:"reg"
    },{
        a:4,
        b:5,
        state:0,
        name:"bridge2"
    }]
}];