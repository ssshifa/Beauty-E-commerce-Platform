#include<iostream>
#include<string>
using namespace std;

char STACK[100];
int TOP = 0;

int priority(char c) {
    if(c == '*' || c == '/') return 2;
    if(c == '+' || c == '-') return 1;
    return 0;
}

int main() {
    string Q, P = "";
    cout << "Enter infix: ";
    cin >> Q;

    STACK[++TOP] = '(';
    Q += ")";

    for(char c : Q) {
        if(isalnum(c)) P += c;
        else if(c == '(') STACK[++TOP] = c;
        else if(c == '+' || c == '-' || c == '*' || c == '/') {
            while(priority(STACK[TOP]) >= priority(c)) P += STACK[TOP--];
            STACK[++TOP] = c;
        }
        else if(c == ')') {
            while(STACK[TOP] != '(') P += STACK[TOP--];
            TOP--;
        }
    }
    cout << "Postfix = " << P << endl;
}
