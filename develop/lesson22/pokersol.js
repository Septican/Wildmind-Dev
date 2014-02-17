// global variables
var tally = new Array(14)
var nextcard = 1;
var nexti = new Image(53,68);

// numeric comparison for sort()
function numsort(a, b) {
   return a - b;
}

function InitGame() {
   if (!document.getElementById) return;
   stat=document.getElementById("status");
   stat.innerHTML="Next Card";
   nextcard = 1;
// array for board contents
   board = new Array(26);
   for (i=1; i<26; i++) {
      board[i] = new Card(0,"x");
      obj=document.getElementById("card"+i);
      obj.src = "blank.gif";
      obj.onclick = PlaceCard;
   }
   // fill the deck (in order, for now)
   deck = new Array(53);
   for (i=1; i<14; i++) {
     deck[i] = new Card(i,"c");
     deck[i+13] = new Card(i,"h");
     deck[i+26] = new Card(i,"s");
     deck[i+39] = new Card(i,"d");
   }
   // Clear the scores
   Score();
   // shuffle the deck
   n = Math.floor(100 * Math.random() + 200);
   for (i=1; i<n; i++) {
      c1 = Math.floor(52*Math.random() + 1);
      c2 = Math.floor(52*Math.random() + 1);
      temp = deck[c2];
      deck[c2] = deck[c1];
      deck[c1] = temp;
   }

   // draw the first card on screen
   next=document.getElementById("dcard");
   next.src = deck[nextcard].fname();
   // preload the next image
   nexti.src = deck[nextcard+1].fname();
   obj=document.getElementById("newgame")
   obj.onclick=InitGame;
} // end InitGame

// place the draw card on the board where clicked

function PlaceCard(e) {
   if (!e) var e = window.event;
   // which space on the board was clicked?
   thiscard = (e.target) ? e.target: e.srcElement;
   pos = thiscard.id.substring(4);
   if (board[pos].suit != "x") {
      return;
   }
   drawcard=document.getElementById("dcard");
   thiscard.src = deck[nextcard].fname();
   drawcard.src = "blank.gif";
   board[pos] = deck[nextcard];
   nextcard++;
   Score();
   // Game over?
   if (nextcard > 25) {
      EndGame();
   }
   else {
      drawcard.src = deck[nextcard].fname();
   // cache next image for draw pile
      nexti = new Image(53,68);
      nexti.src = deck[nextcard+1].fname();
   }
}

// check for completed rows and display row scores
function Score() {
   score=document.getElementById("totalscore");
   totscore = 0;
// rows
   for (x=0; x<5; x++) {
      r = x * 5 + 1;
      a = AddScore(board[r],board[r+1],board[r+2],board[r+3],board[r+4],"row"+x);
      totscore += a;
   }
// columns
   for (x=0; x<5; x++) {
      r = x + 1;
      a = AddScore(board[r],board[r+5],board[r+10],board[r+15],board[r+20],"col"+x);
      totscore += a;
   }
// diagonals
      a = AddScore(board[5],board[9],board[13],board[17],board[21],"diag1")
      totscore += a;
      a = AddScore(board[1],board[7],board[13],board[19],board[25],"diag2")
      totscore += a;
      score.firstChild.nodeValue = totscore;
}

// check for poker hands
function AddScore(c1,c2,c3,c4,c5,scorebox) {
   obj=document.getElementById(scorebox);
   straight = false;
   flush = false;
   royal = false;
   pairs = 0;
   three = false;

// sorted array for convenience
   nums = new Array(5);
   nums[0] = c1.num;
   nums[1] = c2.num;
   nums[2] = c3.num;
   nums[3] = c4.num;
   nums[4] = c5.num;
   nums.sort(numsort);

// no score if row is not filled
   if (c1.num == 0 || c2.num == 0 || c3.num == 0
       || c4.num == 0 || c5.num == 0) {
      obj.innerHTML="";
      return 0;
   }

// flush
   if (c1.suit == c2.suit && c2.suit == c3.suit
      && c3.suit == c4.suit && c4.suit == c5.suit) {
      flush = true;
   }
// straight
   if (nums[4] - nums[3] == 1
    && nums[3] - nums[2] == 1
    && nums[2] - nums[1] == 1
    && nums[1] - nums[0] == 1) {
      straight = true;
   }

// royal straight (10, J, Q, K, A)
   if (nums[1] == 10 && nums[2] == 11 && nums[3] == 12
    && nums[4] == 13 && nums[0] == 1) {
      straight = true;
      royal = true;
   }

// royal flush, straight flush, straight, flush
   if (straight && flush && royal) {
      obj.innerHTML="Royal Flush<br>250";
      return 250;
   }
   if (straight && flush) {
      obj.innerHTML="Straight Flush<br>50";
      return 50;
   }
   if (straight) {
      obj.innerHTML="Straight<br>4";
      return 4;
   }
   if (flush) {
      obj.innerHTML="Flush<br>5"
      return 5;
   }

// tally array is a count for each card value
   for (i=1; i<14; i++) {
      tally[i] = 0;
   }
   for (i=0; i<5; i++) {
      tally[nums[i]] += 1;
   }

   for (i=1; i<14; i++) {
// four of a kind
      if (tally[i] == 4) {
         obj.innerHTML="Four of a Kind<br>25";
         return 25;
      }
      if (tally[i] == 3) three = true;
      if (tally[i] == 2) pairs += 1;
   }
// full house
   if (three && pairs == 1) {
      obj.innerHTML="Full House<br>8";
      return 8;
   }
// two pair
   if (pairs == 2) {
      obj.innerHTML="Two Pair<br>2";
      return 2;
   }
// three of a kind
   if (three) {
      obj.innerHTML="Three of a Kind<br>3";
      return 3;
   }
// just a pair
   if (pairs == 1) {
      obj.innerHTML="Pair<br>1";
      return 1;
   }
// nothing
   obj.innerHTML="No Score<br>0";
   return 0;
// end AddScore()
}

// game over - final score
function EndGame() {
   stat=document.getElementById("status");
   stat.innerHTML="<b>Game Over</b>";
}

// make a filename for an image, given Card object
function fname() {
   return this.num + this.suit + ".gif";
}

// constructor for Card objects
function Card(num,suit) {
   this.num = num;
   this.suit = suit;
   this.fname = fname;
}

// event handlers to start game
window.onload=InitGame;

