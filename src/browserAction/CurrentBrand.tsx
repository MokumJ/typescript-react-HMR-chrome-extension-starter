import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import ComparingBrands from './ComparingBrands';

const getHost = gql`
    query GetHost($host: String) {
        brand(url: $host) {
            name
            url
            brandInfo
            sustainability
            priceclass
            category
            products
            foundedIn
            parent
        }
    }
`;

interface Props {
    host: string;
}

const CurrentBrand = ({ host }: Props) => {
    const { loading, error, data } = useQuery(getHost, {
        variables: { host },
    });
    return (
        <Container>
            {!loading && data.brand !== null ? (
                <>
                    <Title>{data.brand.name}</Title>
                    <Text>{data.brand.brandInfo}</Text>
                    <ComparingBrands currentBrand={data.brand} />
                </>
            ) : loading ? (
                <Title>loading..</Title>
            ) : (
                <Text>Geen resultaat</Text>
            )}
        </Container>
    );
};

const Container = styled.div`
    font-size: 18px;
    margin-top: 20px;
    background-color: #ffffff;
`;

const Title = styled.div`
    font-size: 28px;
    padding-left: 20px;
    margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 12px
  padding-left: 20px;
`;

const Popup = styled.div`
    text-align: left;
    min-height: 800px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

export default CurrentBrand;
