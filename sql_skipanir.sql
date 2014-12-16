# Get coordinates of photos taken by Icelanders
SELECT latitude, longitude
FROM Photo p
WHERE latitude IS NOT NULL
AND longitude IS NOT NULL
AND p.photographer IN(SELECT username
                   FROM Photographer pg
                   WHERE pg.country LIKE '%Iceland%'
                   OR pg.country LIKE '%Ísland%');


# Get coordinates of photos taken by foreigners
SELECT latitude, longitude, pg.country
FROM Photo p, Photographer pg
WHERE p.photographer = pg.username
AND latitude IS NOT NULL
AND longitude IS NOT NULL
AND pg.country IS NOT NULL
AND pg.country <> ""
AND pg.country NOT LIKE '%Iceland%'
AND pg.country NOT LIKE '%Ísland%';


# Get coordinates of photos taken by people with unknown nationality
SELECT latitude, longitude
FROM Photo p
WHERE latitude IS NOT NULL
AND longitude IS NOT NULL
AND p.photographer IN(SELECT username
                   FROM Photographer pg
                   WHERE pg.country IS NULL
                   OR pg.country = "");




# Get the number of photos by Icelanders
SELECT COUNT(*)
FROM Photo p
AND p.photographer IN(SELECT username
                   FROM Photographer pg
                   WHERE pg.country LIKE '%Iceland%'
                   OR pg.country LIKE '%Ísland%');

# Get the number of photos taken by foreigners
SELECT COUNT(*)
FROM Photo p, Photographer pg
WHERE p.photographer = pg.username
AND latitude IS NOT NULL
AND longitude IS NOT NULL
AND pg.country IS NOT NULL
AND COUNTRY <> ""
AND pg.country NOT LIKE '%Iceland%'
AND pg.country NOT LIKE '%Ísland%';

# Get the number of photos taken by people with unknown nationality
SELECT COUNT(*)
FROM Photo p
WHERE latitude IS NOT NULL
AND longitude IS NOT NULL
AND p.photographer IN(SELECT username
                   FROM Photographer pg
                   WHERE pg.country IS NULL
                   OR pg.country = "");
