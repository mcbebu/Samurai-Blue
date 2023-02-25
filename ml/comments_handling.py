from __future__ import unicode_literals, print_function
import pandas as pd
import numpy as np
from functools import lru_cache
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import psycopg2

def query_db():
    try:
        connection = psycopg2.connect(database="xianxiangdatabase",
                        host="119.8.165.76",
                        user="root",
                        password="P@ssw0rdninjavan",
                        port="5432")
        cursor = connection.cursor()
        sql_query = 'select * from "Product";'

        cursor.execute(sql_query)
        print("Selecting rows from mobile table using cursor.fetchall")
        product_list = cursor.fetchall()

        print("Print each row and columns data")
        for row in product_list:
            print("Id = ", row[0], )
            print("Name = ", row[1])
            print("Price  = ", row[2], "\n")

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)

    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

# function to compute lev distance
def lev_dist(a, b):
    @lru_cache(None)  # for memorization

    def min_dist(s1, s2):
        if s1 == len(a) or s2 == len(b):
            return len(a) - s1 + len(b) - s2

        # case where no change required
        if a[s1] == b[s2]:
            return min_dist(s1 + 1, s2 + 1)

        return 1 + min(
            min_dist(s1, s2 + 1),
            min_dist(s1 + 1, s2),
            min_dist(s1 + 1, s2 + 1),
        )

    return min_dist(0, 0)

def main(message):
    # first handle the codes
    reference_product_codes = ['BLUEM', 'COCO', 'HOTTIE', 'FBPORT']
    reference_product_names = ['BLUEBERRY', 'COCONUT', 'HOTPLATE', 'FOOTBALL']

    code = ""
    qty = 0

    # split message to parse thru properly
    message1 = message.split(" ")

    # loop thru message and check if there is a candidate code
    for entry in message1:
        if entry.upper()[:-2] in reference_product_codes:
            code = entry.upper()[:-2]
            qty = int(entry.upper()[-1:])
        # else loop thru reference_product_codes and check if theres an entry with max of 1 lev dist
        else:
            for i in range(0, len(reference_product_codes)): 
                if lev_dist(entry.upper()[:-2], reference_product_codes[i]) == 1 and entry.upper()[-1:].isdigit():
                    code = reference_product_codes[i]
                    qty = int(entry.upper()[-1:])
                    break
    
    # now handle cases of product name

    # load model and predict sentiment
    with open('ninjavan_model.pkl', 'rb') as file:  
        Pickled_LR_Model = pickle.load(file)

    with open('tfidf.pickle', 'rb') as file:  
        vectoriser = pickle.load(file)


    x_test = vectoriser.transform([message])

    # message = np.array(message)
    sentiment = Pickled_LR_Model.predict(x_test)

    if sentiment == 0:
        sentiment = "negative"
    else:
        sentiment = "positive"
    
    print(sentiment)

    # then check if the product namea is in the message
    for word in message:
        if word.upper() in reference_product_names and sentiment == "positive":
            code = reference_product_codes[reference_product_names.index(word.upper())]
            qty = 1
        else:
            for i in range(0, len(reference_product_names)):
                if lev_dist(word.upper(), reference_product_names[i]) <= 2 and sentiment == "positive":
                    code = reference_product_codes[i]
                    qty = 1

    return (code, qty)

print(main("BLUEM+1"))
print(main("i love blueberrys"))
# query_db()