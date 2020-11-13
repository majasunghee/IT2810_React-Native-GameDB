import React from "react";
import {Item, Input, Icon, Header} from "native-base";

const SearchBar = ({setSearch}) => (

  <Header searchBar style={{backgroundColor: 'red'}}>
  <Item>
    <Icon name="ios-search" />
    <Input
      onChangeText={text => setSearch(text)}
      placeholder="Search" 
      />
  </Item>
</Header>
)

export default SearchBar;
