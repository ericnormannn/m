<?php
namespace Craft;

return [
    'endpoints' => [
        'users.json' => [
            'elementType' => 'User',
            'criteria' => ['groups' => 'all'],
            'transformer' => function(UserModel $entry) {
                return [
                    'id' => $entry->id,
                    'fullName' => $entry->fullName,
                    'photoUrl' => $entry->photoUrl,
                ];
            },
        ],
    ]
];