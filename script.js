const area = document.getElementById('area');
const bSortBtn = document.getElementById('bsort');
const mSortBtn = document.getElementById('msort');
const sizeElement = document.getElementById('size');
//const speedElement = document.getElementById('speed');




let number = 50
let dummy = [];

function resetDummy(){
    dummy = [];
    //console.log(dummy);
    for(let i=0 ;i<area.childElementCount; i++){
        dummy.push({
            height: area.children[i].style.height
        })
    }
}

// Update the current slider value (each time you drag the slider handle)
sizeElement.oninput = function() {
  number = this.value;
  area.innerHTML = '';  //removing all the elements in the area div
  createNumbers(this.value); 
}


let speed = 40;
// speedElement.oninput = function() {
//     speed = 1001 - this.value;
//     //console.log(speed); 
// }


function createNumbers (k){
    for(let i=0 ;i<k; i++){
        let div = document.createElement('div');  //creating a div element
        div.setAttribute('class','number');
        let height = ((Math.floor(Math.random()*50))+ 1).toString(10) + 'vh';
        div.style.height = height ;
        area.appendChild(div);
    }
    for(let i=0 ;i<area.childElementCount; i++){
    dummy.push({
        height: area.children[i].style.height
    })
}
}


// used async because we are using wait to slow down the execution speed
const bubbleSort = async() => {
    console.log('start sorting');
    for(let i=0; i<number; i++){
        for(let j=0; j<number-i-1; j++){
            lenj = parseInt(area.children[j].style.height, 10);
            lenj1 = parseInt(area.children[j+1].style.height, 10);
            
            if(lenj > lenj1){
                
                let placeholder = area.children[j].style.height;
                area.children[j].style.height = area.children[j+1].style.height
                area.children[j+1].style.height = placeholder;
                area.children[j+1].style.backgroundColor = '#ffbf00';
                area.children[j].style.backgroundColor = '#57a0d3';
                await sleep(speed);
            }else{
                area.children[j].style.backgroundColor = '#57a0d3';
                area.children[j+1].style.backgroundColor = '#ffbf00';
                await sleep(speed);
            }
        }
        area.children[number-i-1].style.backgroundColor = 'green';
    }
}



//utitlity function
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}



// creating the numbers for the first time when the page loads
createNumbers(number);

arr = [2,10,4,8,6,0,34,1,1,2,1];

let animations = [];
function resetAnimations(){
    animations = [];
}


function merge(l, m, r){
    let i,j,k;
    let left = [];
    let right = [];

    let n1 = m -l  +1;
    let n2 = r-m;

    for(i=0; i<n1; i++){
        left.push(parseInt(dummy[l+i].height,10));
    }
    for(j=0; j<n2; j++){
        right.push(parseInt(dummy[m+1+j].height,10));
    }

    i=0;
    j=0;
    k=l;

    while(i<n1 && j<n2){
        if(left[i] <= right[j]){
            dummy[k].height = left[i].toString(10)+'vh';
            animations.push({
                index: k,
                height: left[i].toString(10)+'vh'
            });
            i++
        }else{
            dummy[k].height = right[j].toString(10)+'vh';
            animations.push({
                index: k,
                height: right[j].toString(10)+'vh'
            });
            j++;
        }
        k++;
    }
    
    while(i < n1){
        dummy[k].height = left[i].toString(10)+'vh';
        animations.push({
            index: k,
            height: left[i].toString(10)+'vh'
        });
        i++;
        k++;
    }

    while(j < n2){
        dummy[k].height = right[j].toString(10)+'vh';
        animations.push({
            index: k,
            height: right[j].toString(10)+'vh'
        });
        j++;
        k++;
    }
}

function mergeSort(l,r){
    if(l<r){
        let mid = Math.floor((l+r)/2);
        mergeSort(l, mid);
        mergeSort(mid+1, r);
        merge(l, mid, r);
    }
}

// to test setTimeout() function
function color(){
    for(let i=0; i<area.childElementCount; i++){
        area.children[i].style.backgroundColor = 'green';
    }
}

function animate(){
    for(let i=0; i<animations.length; i++){
        setTimeout(() => {
            let idx = animations[i].index;
            let h = animations[i].height;
            area.children[idx].style.height = h;
            area.children[idx].style.backgroundColor = '#57a0d3';
        }, i*speed);
    }
    setTimeout(()=>{
        color();
    }, speed*animations.length);
}

//mergeSort(0, area.childElementCount - 1);
mSortBtn.addEventListener('click', () => { //cant we pass direct arguments in event listeners
    resetDummy();
    resetAnimations();
    mergeSort(0, area.childElementCount - 1);
    //console.table(animations);
    animate();
    
});

bSortBtn.addEventListener('click', () => { //cant we pass direct arguments in event listeners
    bubbleSort();
});


