import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "./src/components/Navbar";
import Modal from "./src/components/Modal";
import {Container, Content, List, ListItem, Picker, Icon, Left, Right } from "native-base";
import SearchBar from "./src/components/SearchBar";
import Pagination from "./src/components/Pagination";
import * as Font from "expo-font";
import ListRender from './src/components/ListRender';
import styles from './AppStyles';

interface IGame {
  name: string;
  platform: string;
  msrp: number;
  publisher: string;
  developer: string;
  esrb: string;
  releasedate: string;
  romfilesize: string;
  genre: string;
  storelink: string;
  officialsite: string;
}

const App: React.FC<IGame> = () => {
  //state that hold the fetched games
  const [games, setGames] = useState<IGame[]>([]);

  //states used in the modal
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const [index, setIndex] = useState();

  //states used in pagination
  const [pageNum, setPageNum] = useState<number>(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
  const pageResults: number = games.length;

  //state used in searching
  const [search, setSearch] = useState<string>("");

  const [filter, setFilter] = useState<string>('none');

  // native base uses fonts that need to be loaded async
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  //fetches needed games
  const fetchGames = () => {
    let requestBody = {
      query: `
                    query {
                        games(name: "${search}", skip: ${pageNum}) {
                        _id
                        name
                        platform                        
                        msrp
                        publisher
                        developer
                        esrb
                        releasedate
                        romfilesize
                        genre
                        storelink
                        officialsite
                        }                     
                    }
              `,
    };

    fetch("http://it2810-40.idi.ntnu.no:3000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        const data = res.json();
        return data;
      })
      .then((resData) => {
        const games = resData.data.games;
        setGames(games);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //rendres the fetching games function when either
  //the searchword or pagenumber changes
  useEffect(() => {
    fetchGames();
  }, [pageNum, search]);
  console.log(filter);
  console.log(pageResults);
  console.log(search);

  //used to keep track of the game element that
  //has been clicked
  const handleClick = (index) => {
    setIndex(index);
    setDetails(games[index]);
    setShow(true);
  };

  //closes the modal
  const closeModal = () => {
    setShow(false);
  };
 
  //Previous button is clickable  except when on the fist page number
  //The next button is clickable as long as there are game elements in pageResults
  function nextButton() {
    if (pageNum >= 1) {
      setPrevBtnDisabled(false);
      if (pageResults < 12) {
        setNextBtnDisabled(true);
      }
    }
    setPageNum(pageNum + 1);
  }


  //Previous button is disabled if on the first page
  //Next button is enabled
  function prevButton() {
    if (pageNum <= 2) {
      setPrevBtnDisabled(true);
    }
    setNextBtnDisabled(false);
    setPageNum(pageNum - 1);
  }

  function updateChange(value) {
    setFilter(value);
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <NavBar />
      <SearchBar setSearch={setSearch} />
      <View style={{backgroundColor: 'red', flexDirection: 'row', maxHeight: 50 }}>
        
        <Text style={ {color: 'white',fontSize: 18, flex: 1, alignItems: 'center', textAlignVertical: 'center', paddingLeft: 15, fontWeight: 'bold'}}>Filter on PEGI: </Text>
      
      <View style={{backgroundColor:'white',  flex:1, margin: 5, marginRight:10, justifyContent: 'center', paddingLeft:10}}>
      <Picker 
        style={{ backgroundColor:'green'}}
        mode='dropdown' 
        iosHeader='Filter'
        selectedValue={filter}
        onValueChange={(val) => updateChange(val)}
        >
        <Picker.Item label='clear filter' value='none' />
        <Picker.Item label='Everyone' value='Everyone'/>
        <Picker.Item label='Everyone +10' value='Everyone +10'/>
        <Picker.Item label='Teen' value='Teen'/>
        <Picker.Item label='Mature' value='Mature'/>
        
      </Picker>
      </View>

      </View>
      
      <Content>
        <View style={show ? { opacity: 0.3 } : null}>
          <List style={{ backgroundColor: "#DBDADA" }}>
            {filter=='none' ?
            games.slice(0, 6).map((game, index) => {
              return (
                <ListRender game={game} index={index} handleClick={handleClick}/>
              );
            }) : 
            games.filter((e)=> {
              return e.esrb == filter
            }).slice(0, 6)
              .map((game, index)=>{
                return (
                  <ListRender game={game} index={index} handleClick={handleClick}/> 
                ); 
            })}

          </List>
        </View>
      </Content>
      {show == true ? (
        <View>
          <Modal detail={details} close={closeModal}/>
        </View>
      ) : null}
      <Pagination
        pageNum={pageNum}
        nextButton={() => nextButton()}
        prevButton={() => prevButton()}
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
      />
    </Container>
  );
};

export default App;
