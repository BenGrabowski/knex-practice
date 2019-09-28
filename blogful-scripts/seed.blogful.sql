BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
    ('Title 1', '2016-01-16 12:00:00', 'Content 1'),
    ('Title 2', '2016-05-01 15:00:00', 'Content 2'),
    ('Title 3', '2017-02-22 12:00:00', 'Content 3'),
    ('Title 4', '2017-04-04 08:00:00', 'Content 4'),
    ('Title 5', '2017-04-23 15:00:00', 'Content 5'),
    ('Title 6', '2017-08-11 13:00:00', 'Content 6'),
    ('Title 7', '2017-12-09 17:00:00', 'Content 7'),
    ('Title 8', now() - '29 days'::INTERVAL, 'Content 8'),
    ('Title 9', now() - '26 days'::INTERVAL, 'Content 9'),
    ('Title 10', now() - '14 days'::INTERVAL, 'Content 10'),
    ('Title 11', now() - '8 days'::INTERVAL, 'Content 11'),
    ('Title 12', now() - '20 days'::INTERVAL, 'Content 12'),
    ('Title 13', now() - '11 days'::INTERVAL, 'Content 13'),
    ('Title 14', now() - '5 days'::INTERVAL, 'Content 14'),
    ('Title 15', now() - '2 days'::INTERVAL, 'Content 15'),
    ('Title 16', now() - '15 days'::INTERVAL, 'Content 16'),
    ('Title 17', now() - '9 days'::INTERVAL, 'Content 17'),
    ('Title 18', now() - '13 days'::INTERVAL, 'Content 18'),
    ('Title 19', now() - '17 days'::INTERVAL, 'Content 19'),
    ('Title 20', now() - '1 days'::INTERVAL, 'Content 20');
   
   COMMIT;