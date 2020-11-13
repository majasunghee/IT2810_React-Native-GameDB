import React, {useState} from "react";
import {Container, Text, Item, Input, Icon, Button, Header} from "native-base";

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
