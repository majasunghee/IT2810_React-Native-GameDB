import { StatusBar } from "expo-status-bar";
import { Text, Container, Content , List, ListItem} from 'native-base';
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
//import SearchBar from "./src/components/SearchBar";
import NavBar from "./src/components/Navbar";
import Pagination from './src/components/Pagination';

export default function App() {

  

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

 

  const [pageNum, setPageNum] = useState(1);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const pageResults = games.length;  

  useEffect(() => {
    fetchEvents();
  }, [pageNum]);

  const fetchEvents = () => {
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

    //Previous button is clickable  except when on the fist page number
    //The next button is clickable as long as there are game elements in pageResults
    function nextButton() {
      if (pageNum >= 1) {
        setPrevBtnDisabled(false);
        if (pageResults < 12) {
          setNextBtnDisabled(true);
        }
      }
      setPageNum(pageNum+1);
    }

    //Previous button is disabled if on the first page
    //Next button is enabled 
    function prevButton() {
      if (pageNum <= 2) {
        setPrevBtnDisabled(true);
      }
      setNextBtnDisabled(false);
      setPageNum(pageNum-1);
    }

console.log(pageNum);
   // console.log("Pageresults = " +pageResults);
   // console.log("pageNum" + pageNum);


  return (
    <Container>
      <StatusBar style="auto" />
      <NavBar/>
      <Content>
        
        <List>
        {games.slice(0,6).map(game => {
          return <ListItem>
            <Text>{game.name}{"\n"}{game.msrp}{"\n"}By: {game.developer}</Text>
            </ListItem>;
        })}
        </List>
      </Content>     
      <Pagination 
          pageNum={pageNum} 
          nextButton={() => nextButton()} 
          prevButton={() => prevButton()}
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
        />    
    </Container>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
