#include <stdio.h>
//#include <iostream>
//#include <memory.h>
//#include <assert.h>
//#include <algorithm>
//#include <functional>
//#include <vector>
//#include <string>
//#include <map>
//#include <set>
//#include <deque>
//#include <math.h>

int a[200][200], ptr[10003];

int qresult(int c[5], int q)
{
	int l;
	if(q==0)return 0;
	else{
		l=c[0];
		for(int i=1;i<q;i++)
		if(l>c[i]){
			if(ptr[l]==0)ptr[l]=c[i];
			l=c[i];
		}
		else {if(l<c[i])
			if(ptr[c[i]]==0) ptr[c[i]]=l;
		}
	}
	return l;	
}
void fill(int r, int d[5][2], int p)
{
	for(int i=0;i<p;i++)
	a[d[i][0]][d[i][1]]=r;
	ptr[r]=0;
}

int main( )
{
	int tt,d[5][2],c[5];
	char e[200];
	freopen( "input.txt", "r", stdin );
	//freopen( "output.txt", "w", stdout );
	scanf( "%d\n", &tt );
	ptr['#']=ptr['.']=0;
	for(int t= 0; t < tt; ++ t )
	{
		int ptr_count=0,count=0,i,j,l,b;
		scanf("%d %d\n",&l,&b);
		for(i=0; i<l;i++) {scanf("%s",&e);for(j=0;j<b;j++)a[i][j]=e[j];}
		for(i=0; i<l;i++) for(j=0;j<b;j++) if(a[i][j]!='.'){
			int o=1,q=0,p=0;//printf("<%d><%d>{%c}\n",i,j,a[i][j]+'0');
			for(int m=i+1,n=j-1;n<j+2;m+=(o*=-1),n+=o<0?1:0)
			if(a[m][n]!='.' && n>=0 && n<b && m<l){//printf("<%d><%d>(%c)\t",m,n,a[m][n]+'0');
				if(a[m][n]=='#'){ d[p][0]=m; d[p++][1]=n;}
				else c[q++]=a[m][n];
			}
			int r=qresult(c,q);//printf("\n[%d][%d][%d]\n",p,q,r);
			if(r==0){fill(++count=='#'||count=='.'?++count:count,d,p);ptr[count]=0;}
			else fill(r,d,p);
		}
        	for(j=1;j<=count;j++){//printf("%5d%5d^\n",j,ptr[j]);
			if(ptr[j]==0)ptr_count++;
		}
		printf("%d\n",count>'.'?ptr_count-2:count>'#'?ptr_count-1:ptr_count);
		//for(i=0;i<l;i++){for(j=0;j<b;j++)printf("%5d",a[i][j]);printf("\n");}
	}
	//fclose(stdout);
	fclose(stdin);
	return 0;
}
