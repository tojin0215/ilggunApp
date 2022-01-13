//pdf 관련
 //https://medium.com/dev-genius/how-to-generate-a-pdf-document-in-a-react-native-project-b184e46ef67fhttps://medium.com/dev-genius/how-to-generate-a-pdf-document-in-a-react-native-project-b184e46ef67f
const axios = require('axios');
  
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview'
// import ImgSign from '../../11.png'
class ContractformScreen extends Component{

  state={
  }

  updateState(){}
  /*SignPost = async(blob) => {
    try {
      
      let res = await fetch('http://192.168.43.253:3000/uploadContractform', {
        method: 'POST',
        body: JSON.stringify({
            pdf: blob,
        }),
      });
      res = await res;
      
      //navigation.navigate('Business List')
      console.log(res)
      
    } catch (e) {
      console.error(e);
    }
  }*/
  
    /*fetchHtml = (a) => {
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pdf Content</title>
                <style>
                    body {
                        font-size: 16px;
                        color: rgb(255, 196, 0);
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>근로계약서</h1>
                <h1>${a}</h1>
            </body>
            </html>
            `;

        const dataForm = new FormData();
        dataForm.append('file',htmlContent);  
            axios
                .post('http://192.168.43.253:3000/uploadContractform', dataForm)
                .then(res => {
                })
                .catch(err => console.log(err));      
    }

  /*fetchPdf = async(uri) => {
    await fetch(uri).then(async(fetchResponse) =>{
        console.log("aaaa");
        console.log("뮁?");
        console.log(JSON.stringify(fetchResponse))
        const dataForm = new FormData();
        dataForm.append('file',this.hhhtmlContent);  
            axios
                .post('http://192.168.43.253:3000/uploadContractform', dataForm)
                .then(res => {
                })
                .catch(err => console.log(err));      
      
    })}
    await FileSystem.readAsStringAsync(uri)
        .then((res) => {
        // the conversion is done in native code
        //let base64Str = res.base64()
        SignPost(res);
        // the following conversions are done in js, it's SYNC
        //let text = res.text()
        //let json = res.json()
    })+
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
        // error handling
    })*/
    
    StatementScreen = async() => {
      axios.post('https://일꾼.kr/api/selectImg', {},
      {  headers:{
        'Content-Type':'application/json',
      'Accept': 'application/json'}
    })
      /*fetch("https://일꾼.kr/api/selectImg",{
        method: 'POST',})*/
          .then(res => 
            {
              console.log(res)
              console.log("나와라ㅏㅏㅏㅏ");
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pdf Content</title>
                <style>
                    body {
                        font-size: 16px;
                        color: rgb(255, 196, 0);
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                
                <div style="left: 100px; width: 450px; bottom: 140px; font-size: 1.8em; font-weight: bold; position: absolute;">
                  ${res.data[0]}
                  <h1>근로계약서</h1>
                </div>
                
                <h1>${this.state.a}</h1>
            </body>
            </html>
            `;

            this.setState({htmlContent : htmlContent})
            //const { uri } = await Print.printToFileAsync({ htmlContent },base64=true);
            //Sharing.shareAsync(uri);
          
          });
        
    }
    createPDF = async (html) => {
        try {
            await Print.printToFileAsync({ html })
            .then((result)=>{
                //console.log(result.uri);
                this.fetchPdf(result.uri)
                
                //this.SignPost(result.uri);
            });
            //SignPost( await Print.printToFileAsync({ html }));
            //const { uri } = await Print.printToFileAsync({ html });
            //return uri;
        } catch (err) {
            console.error(err);
        }
    };
    createAndSavePDF = async (html) => {
        try {
          const { uri } = await Print.printToFileAsync({ html },base64=true);
          Sharing.shareAsync(uri);
                // 이미지 파일, PDF 와 같은 미디어 리소스의 경우
          
          /*if (Platform.OS === "ios") {
            await Sharing.shareAsync(uri);
          } else {
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (permission.granted) {
              await MediaLibrary.createAssetAsync(uri);
              MediaLibrary.createAssetAsync(uri).then((w) => {
                this.fetchPdf(w.uri);  
                //console.log(w);
              })
            }
          }
          await Sharing.shareAsync(uri, {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dialogTitle: 'MyWater data',
            UTI: 'com.microsoft.excel.xlsx'
          });*/
          
        } catch (error) {
          console.error(error);
        }
      };


// html, txt의 경우
//fetch("examples/example.html")
//.then(res => res.text())
//.then(text => console.log(text));

  constructor(props) {
    super(props);
    this.state = {
      img:'',
      a : '',
      b : '',
      c : '',
      d : '',
      e : '',
      f : '',
      g : '',
      h : '',
      i : '',
      j : '',
      k : '',
      l : '',
      m : '',
      n : '',
      htmlContent:  `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pdf Content</title>
          <style>
              body {
                  font-size: 16px;
                  color: rgb(255, 196, 0);
              }
              h1 {
                  text-align: center;
              }
          </style>
      </head>
      <body>
          
          <div>
            <h1 style="left: 100px; width: 450px; bottom: 140px; font-size: 1.8em; font-weight: bold; position: absolute;">근로계약서</h1>
            <img style="left: 270px; height:10px; width: 10px; bottom: 180px; font-size: 1.8em; font-weight: bold; position: absolute;" src="https://일꾼.kr/api/11.jpg">
            
          </div>
      </body>
      </html>
      `,}
      
    }
  render() {
    const state = this.state;
    const {a,b,c,d,e,f,g,h,i,j,k,l,m,n} = this.state
    
    return (
      <>
        <WebView
        originWhitelist={['*']}
        source={{ html: this.state.htmlContent }}
        style={{ marginTop: 20 }}
      />
      <Button
              title="공유하기"
              color="#FF3232"
              onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}/>
      </>
    )
  }
}

export default ContractformScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
