import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const getComparingBrands = gql`
    query GetComparingBrands($host: String, $priceclass: Int, $category: String, $products: String) {
        comparingBrand(url: $host, priceclass: $priceclass, category: $category, products: $products) {
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
    currentBrand: any;
}

const ComparingBrands = ({ currentBrand }: Props) => {
    const { loading, error, data } = useQuery(getComparingBrands, {
        variables: {
            host: currentBrand.url,
            priceclass: currentBrand.priceclass,
            category: currentBrand.category,
            products: currentBrand.products,
        },
    });
    return (
        <Container>
            {!loading && data.brand !== null ? (
                <>
                    <Title>{data.comparingBrand.name}</Title>
                    <Text>{data.comparingBrand.brandInfo}</Text>
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
    padding: 20px;
    margin-top: 20px;
    background-color: #e1f7d5;
`;

const Title = styled.div`
    font-size: 28px;
    margin-bottom: 20px;
`;

const Text = styled.div`
    font-size: 12px;
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

export default ComparingBrands;
